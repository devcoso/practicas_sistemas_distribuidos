import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Server {
    public static void main(String[] args) {
        try {
            MatrixMultiplierImpl obj = new MatrixMultiplierImpl();
            Registry registry = LocateRegistry.createRegistry(1099); // Puerto RMI
            registry.rebind("MatrixMultiplier", obj);
            System.out.println("\n\nMultiplicador de Matrices \n\nServidor RMI esperando...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
