import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class MatrixMultiplierImpl extends UnicastRemoteObject implements MatrixMultiplier {
    protected MatrixMultiplierImpl() throws RemoteException {
        super();
    }

    @Override
    public int[][] multiplie(int[][] a, int[][] b) throws RemoteException {
        int[][] result = new int[a.length][b[0].length];
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < b[0].length; j++) {
                for (int k = 0; k < a[0].length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }
}
