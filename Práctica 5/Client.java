import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            MatrixMultiplier stub = (MatrixMultiplier) registry.lookup("MatrixMultiplier");
            System.out.println("\n\nRespuesta del servidor: \n");
            int[][] a = {{1, 2, 3}, {4, 5, 6}};
            int[][] b = {{7, 8}, {9, 10}, {11, 12}};
            int[][] result = stub.multiplie(a, b);
            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[0].length; j++) {
                    System.out.print(result[i][j] + " ");
                }
                System.out.println();
            }
            System.out.println();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
