package pedido.com.pe;

public class DocumentoDePago extends Documento{
	String NumeroFact;
	double importeNeto;
	double importeIGV;
	double importeTotal;
	public String getNumeroFact() {
		return NumeroFact;
	}
	public void setNumeroFact(String numeroFact) {
		NumeroFact = numeroFact;
	}
	public double getImporteNeto() {
		return importeNeto;
	}
	public void setImporteNeto(double importeNeto) {
		this.importeNeto = importeNeto;
	}
	public double getImporteIGV() {
		return importeIGV;
	}
	public void setImporteIGV(double importeIGV) {
		this.importeIGV = importeIGV;
	}
	public double getImporteTotal() {
		return importeTotal;
	}
	public void setImporteTotal(double importeTotal) {
		this.importeTotal = importeTotal;
	}
	public String verImporteNeto(){
		return "";
	}
}
