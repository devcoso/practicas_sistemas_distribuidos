import java.net.Socket;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Client {
    public static void main(String[] args) {
        Socket client = null;
        try {
            client = new Socket("localhost", 12345);
            ObjectOutputStream out = new ObjectOutputStream(client.getOutputStream());
            ObjectInputStream in = new ObjectInputStream(client.getInputStream());
            Matriz A = new Matriz(6, 6);
            Matriz B = new Matriz(6, 6);
            A.randomFill();
            B.randomFill();
            out.writeObject(A);
            out.writeObject(B);
            Matriz C = (Matriz) in.readObject();
            System.out.println("Matrix A:");
            A.print();
            System.out.println("Matrix B:");
            B.print();
            System.out.println("Matrix C:");
            C.print();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (client != null && !client.isClosed()) {
                try {
                    client.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Client closed");
        }
    }
}
