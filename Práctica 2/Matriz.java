import java.io.Serializable;

public class Matriz implements Serializable {
    
    public int rows;
    public int columns;
    public int[][] matriz;

    public Matriz(int rows, int columns){
        this.rows = rows;
        this.columns = columns;
        this.matriz = new int[rows][columns];
    }
    
    public void randomFill(){
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                matriz[i][j] = (int) (Math.random() * 10);
            }
        }
    }

    public void print(){
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                System.out.print(matriz[i][j] + " ");
            }
            System.out.println();
        }
    }

}
