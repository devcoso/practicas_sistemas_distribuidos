import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.net.ServerSocket;
import java.net.Socket;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

class MatrixMultiplier implements Runnable {
    private final int[][] A, B, C;
    private final int row;

    public MatrixMultiplier(int[][] A, int[][] B, int[][] C, int row) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.row = row;
    }

    @Override
    public void run() {
        int colsB = B[0].length;
        int colsA = A[0].length;
        for (int j = 0; j < colsB; j++) {
            int sum = 0;
            for (int k = 0; k < colsA; k++) {
                sum += A[row][k] * B[k][j];
            }
            C[row][j] = sum;
        }
    }
}

class ClientHandler {
    private final Socket client;
    private final ExecutorService executor;

    public ClientHandler(Socket client) {
        this.client = client;
        this.executor = Executors.newCachedThreadPool();
    }

    public void start() {
        try {
            ObjectInputStream in = new ObjectInputStream(client.getInputStream());
            ObjectOutputStream out = new ObjectOutputStream(client.getOutputStream());
            Matriz A = (Matriz) in.readObject();
            Matriz B = (Matriz) in.readObject();
            Matriz C = new Matriz(A.rows, B.columns);
            for (int i = 0; i < A.rows; i++) {
                executor.execute(new MatrixMultiplier(A.matriz, B.matriz, C.matriz, i));
            }
            executor.shutdown();
            while (!executor.isTerminated()) {
            }
            out.writeObject(C);
            out.flush();
            client.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}

public class Server {
    public static void main(String[] args) {
        ServerSocket server = null;
        try {
            server = new ServerSocket(12345);
            System.out.println("Server started at port 12345");
            while (true) {
                System.out.println("Waiting for connection...");
                ClientHandler client = new ClientHandler(server.accept());
                System.out.println("Client connected");
                client.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (server != null && !server.isClosed()) {
                try {
                    server.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Server closed");
        }
        
    }
}
