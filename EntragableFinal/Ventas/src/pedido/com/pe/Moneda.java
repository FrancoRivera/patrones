package pedido.com.pe;

public class Moneda {
	String nombre;
	String Abreviaci�n;
	public double cambioMoneda(int n){
		return n*3.16;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getAbreviaci�n() {
		return Abreviaci�n;
	}
	public void setAbreviaci�n(String abreviaci�n) {
		Abreviaci�n = abreviaci�n;
	}
	
}
