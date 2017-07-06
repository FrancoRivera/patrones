package pedido.com.pe;

import java.util.Date;

public class Documento {
	Comprador Comprador;
	Vendedor Vendedor;
	Date Fecha;
	String Medio_Pago;
	String Estado;
	Double Importe_Total;
	Moneda Moneda;
	public Comprador getComprador() {
		return Comprador;
	}
	public void setComprador(Comprador comprador) {
		Comprador = comprador;
	}
	public Vendedor getVendedor() {
		return Vendedor;
	}
	public void setVendedor(Vendedor vendedor) {
		Vendedor = vendedor;
	}
	public Date getFecha() {
		return Fecha;
	}
	public void setFecha(Date fecha) {
		Fecha = fecha;
	}
	public String getMedio_Pago() {
		return Medio_Pago;
	}
	public void setMedio_Pago(String medio_Pago) {
		Medio_Pago = medio_Pago;
	}
	public String getEstado() {
		return Estado;
	}
	public void setEstado(String estado) {
		Estado = estado;
	}
	public Double getImporte_Total() {
		return Importe_Total;
	}
	public void setImporte_Total(Double importe_Total) {
		Importe_Total = importe_Total;
	}
	public Moneda getMoneda() {
		return Moneda;
	}
	public void setMoneda(Moneda moneda) {
		Moneda = moneda;
	}
	public void ImprimirDocumento(){
		
	}
	public String GenerarDocumento(){
		return "Hecho";
	}
}
