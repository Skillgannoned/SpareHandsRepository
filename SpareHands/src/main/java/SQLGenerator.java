
public class SQLGenerator {

	static String array[] = {"Athlone","Wexford","Dublin","Galway","Bundoran"};
	public static void main(String[] args) {
		for(int i=9;i<500;i++){
			int id = i%3+1;
			System.out.println("("+i+","+id+",'Random Job "+i+"','Random Description','$20','"+array[i%5]+"','2015-09-19 08:00:00',''),");
		} 

	}

}
