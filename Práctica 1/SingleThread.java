public class SingleThread {
    public static void main(String[] args) {
        int size = 1200;
        int[][] A = generateMatrix(size);
        int[][] B = generateMatrix(size);
        int[][] C = new int[size][size];

        long startTime = System.nanoTime();
        multiplyMatrices(A, B, C);
        long endTime = System.nanoTime();

        System.out.println("\nMultiplicación completada en un solo hilo.");
        System.out.println("Tiempo de ejecución: " + (endTime - startTime) / 1e6 + " ms");
    }

    private static void multiplyMatrices(int[][] A, int[][] B, int[][] C) {
        int size = A.length;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                int sum = 0;
                for (int k = 0; k < size; k++) {
                    sum += A[i][k] * B[k][j];
                }
                C[i][j] = sum;
            }
        }
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
