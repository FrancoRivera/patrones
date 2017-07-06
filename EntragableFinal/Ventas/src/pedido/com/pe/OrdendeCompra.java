package pedido.com.pe;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrdendeCompra extends Documento {

	public OrdendeCompra() {
		ListProd=new ArrayList<Producto>();
		ListProd.add(new Producto(4));
		ListProd.add(new Producto(4.2));
		ListProd.add(new Producto(3.0));
		ListProd.add(new Producto(2.1));
		ListProd.add(new Producto(1.2));
		ListProd.add(new Producto(9.6));
	}
	private Date fecha;

	private List<Producto>ListProd;
	private int id_comprador;
	private int id_vendedor;
	public int getId_comprador() {
		return id_comprador;
	}
	public void setId_comprador(int id_comprador) {
		this.id_comprador = id_comprador;
	}
	public int getId_vendedor() {
		return id_vendedor;
	}
	public void setId_vendedor(int id_vendedor) {
		this.id_vendedor = id_vendedor;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public List<Producto> getListProd() {
		return ListProd;
	}
	public void setListProd(List<Producto> listProd) {
		ListProd = listProd;
	}
	public double Calcular_Importe(){
		double importe=0;
		for(int i=0; i<ListProd.size();i++){
			importe+=ListProd.get(i).getPrecioU();
		}
		return importe;
	}
	public double CalcularImpuestos(){
		double total;
		double importe=Calcular_Importe();
		total=importe*0.18;
		return total;
	}
	public double CalcularMontoTotal(){
		double total=Calcular_Importe()+CalcularImpuestos();
		return total;
	}
}
