package pedido.com.pe;

public class Producto {
	private String unidad_medida;
	private String nombre;
	private double precioU;
	private String Cateforia;
	private int cantidad_Stock;
	
	public Producto(double precioU) {
		super();
		this.precioU = precioU;
	}
	public String getUnidad_medida() {
		return unidad_medida;
	}
	public void setUnidad_medida(String unidad_medida) {
		this.unidad_medida = unidad_medida;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public double getPrecioU() {
		return precioU;
	}
	public void setPrecioU(double precioU) {
		this.precioU = precioU;
	}
	public String getCateforia() {
		return Cateforia;
	}
	public void setCateforia(String cateforia) {
		Cateforia = cateforia;
	}
	public int getCantidad_Stock() {
		return cantidad_Stock;
	}
	public void setCantidad_Stock(int cantidad_Stock) {
		this.cantidad_Stock = cantidad_Stock;
	}
	public String actualizarStock(){
		return "";
	}
	public String verStock(){
		return "";
	}
	
}
