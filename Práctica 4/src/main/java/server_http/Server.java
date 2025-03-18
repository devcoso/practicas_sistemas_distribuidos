package server_http;

import java.net.*;
import java.io.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server implements Runnable {
    private ServerSocket server;
    private int port;
    private ExecutorService pool = Executors.newFixedThreadPool(1000);
    public static final int START_PORT = 8080;

    public Server(int port) {
        this.port = port;
    }

    @Override
    public void run() {
        try {
            server = new ServerSocket(port);
            System.out.println("\n\nServer started on http://localhost:" + port + "/ \n");
            while (!server.isClosed()) {
                Socket client = server.accept();
                System.out.println("Client connected: " + client.getInetAddress().getHostAddress());
                client.setSoTimeout(10000);
                pool.execute(new ServerThread(client));
            }
        } catch (IOException e) {
            if (!server.isClosed()) {
                e.printStackTrace();
            }
        }
    }

    public void stop() {
        try {
            if (server != null && !server.isClosed()) {
                server.close();
                pool.shutdown();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    class ServerThread implements Runnable {
        private Socket client;

        public ServerThread(Socket client) {
            this.client = client;
        }

        public void run() {
            try (
                DataInputStream input = new DataInputStream(client.getInputStream());
                DataOutputStream output = new DataOutputStream(client.getOutputStream());
            ) {
                while (true) {
                    HTTPHandler handler = HTTPHandler.readCompleteRequest(input);
                    if (handler == null) continue;
                    
                    handler.showFormatedRequest();
                    byte[] response = handler.getResponse();

                    output.write(response);
                }
            } catch (SocketTimeoutException e) {
                System.out.println("Client disconnected: " + client.getInetAddress().getHostAddress());
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    client.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void main(String[] args) {
        int numServers = 2;
        Thread[] serverThreads = new Thread[numServers];
        Server[] servers = new Server[numServers];

        for (int i = 0; i < numServers; i++) {
            servers[i] = new Server(START_PORT + i);
            serverThreads[i] = new Thread(servers[i]);
            serverThreads[i].start();
        }

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            for (Server server : servers) {
                server.stop();
            }
        }));
    }
}
