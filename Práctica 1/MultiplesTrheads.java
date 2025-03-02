import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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

public class MultiplesTrheads {
    public static void main(String[] args) {
        int size = 1200;
        int[][] A = generateMatrix(size);
        int[][] B = generateMatrix(size);
        int[][] C = new int[size][size];

        int nThreads = Runtime.getRuntime().availableProcessors();
        System.out.println("Iniciando multiplicación con " + nThreads + " hilos");
        ExecutorService executor = Executors.newFixedThreadPool(nThreads);
        
        long startTime = System.nanoTime();
        for (int i = 0; i < size; i++) {
            executor.execute(new MatrixMultiplier(A, B, C, i));
        }
    
        executor.shutdown();
        while (!executor.isTerminated()) {}
        long endTime = System.nanoTime();

        System.out.println("Multiplicación completada con múltiples hilos.");
        System.out.println("Tiempo de ejecución: " + (endTime - startTime) / 1e6 + " ms");
    }

    private static int[][] generateMatrix(int size) {
        int[][] matrix = new int[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                matrix[i][j] = (int) (Math.random() * 10);
            }
        }
        return matrix;
    }
}
