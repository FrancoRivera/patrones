package pedido.com.pe;

public class Moneda {
	String nombre;
	String Abreviación;
	public double cambioMoneda(int n){
		return n*3.16;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getAbreviación() {
		return Abreviación;
	}
	public void setAbreviación(String abreviación) {
		Abreviación = abreviación;
	}
	
}
