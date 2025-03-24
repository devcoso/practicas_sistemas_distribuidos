import java.rmi.Remote;
import java.rmi.RemoteException;

public interface MatrixMultiplier extends Remote {
    int[][] multiplie(int[][] a, int[][] b) throws RemoteException;
}
