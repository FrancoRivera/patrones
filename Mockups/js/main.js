function validarLogin() {
    if (sessionStorage.getItem('logged') != null)
        return true;
    else {
        return false
    }
}


$(document).ready(function() {
    if (validarLogin()) {
        $("#user").html(sessionStorage.getItem('user'));
        $("#u_dni").html(sessionStorage.getItem('dni'));
        $("#u_place").html(sessionStorage.getItem('place'));
        $("#u_phone").html(sessionStorage.getItem('phone'));

        $("#greeting_usuario").html("Hola, " +sessionStorage.getItem('user') )
    }
    else{
    	$(".login_usuario").show()
    	if(sessionStorage.getItem('user') == null){
    		$(".registro_usuario").show()
    	}
    	
    }
    contador_notif_u = 0;


    mi_id = setInterval(function() {
        if (sessionStorage.getItem("notificacion_u") != null) {
        	pushNotificationUsuario()
        	$(".notificacion_usuario").show("slide", {
							        direction: "up"
							    }, "fast");
						
        	 contador_notif_u = 0;
        	    var not_u =setInterval(function() {
			        if (contador_notif_u > 40) {
			        	clearInterval(not_u)
			        	$(".notificacion_usuario").hide("slide", {
							        direction: "up"
							    }, "fast");
						}
						contador_notif_u +=1;
			    }, 100)
			}
			 if (sessionStorage.getItem("notificacion_c") != null) {
        	pushNotificationComerciante()
        	$(".notificacion_comerciante").show("slide", {
							        direction: "up"
							    }, "fast");
						
        	 contador_notif_u = 0;
        	    var not_u =setInterval(function() {
			        if (contador_notif_u > 40) {
			        	clearInterval(not_u)
			        	$(".notificacion_comerciante").hide("slide", {
							        direction: "up"
							    }, "fast");
						}
						contador_notif_u +=1;
			    }, 100)
			}

    }, 100)

})


function pushNotificationUsuario(){
	obj = JSON.parse(sessionStorage.getItem("notificacion_u"))
	var str= "<b>" + obj.vendedor + ": </b>"
	for (var i = 0; i < obj.carrito.length; i++){
		str += " " + obj.carrito[i].producto + ", "
	}
	$("#notif_usuario_content").html(str)
	sessionStorage.removeItem("notificacion_u")
}

function pushNotificationComerciante(){
	sessionStorage.removeItem("notificacion_c")
}

var carrito = [];
var pedidos = []
$(document).ready(function() {
    if (sessionStorage.getItem("carrito") != null)
        carrito = JSON.parse(sessionStorage.getItem("carrito"))
    if (sessionStorage.getItem("pedidos") != null)
        pedidos = JSON.parse(sessionStorage.getItem("pedidos"))
    ActualizarCarrito()
    ActualizarPedidos()
})

function Producto(vendedor, qty, producto, precio, subtotal) {
    this.vendedor = vendedor;
    this.qty = qty;
    this.producto = producto;
    this.precio = precio;
    this.subtotal = subtotal;

}

function Pedido(usuario, carrito, vendedor) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd }

    if (mm < 10) { mm = '0' + mm }

    today = mm + '/' + dd + '/' + yyyy;
    this.usuario = usuario;
    this.carrito = carrito;
    this.subtotal = 0
    for (var i = 0; i < carrito.length; i++) {
        this.subtotal += carrito[i].subtotal;
    }

    this.igv = this.subtotal * 0.18
    this.total = this.subtotal + this.igv
    this.numeroOC = "B10343" + Math.round(Math.random() * 100);
    this.vendedor = vendedor;
    this.fecha = today;
    this.estado = "Pendiente"
}

$(".ver_reportes").click(function(){
	$(".reportes_comerciante").show(
		"slide", { direction: "bottom" }, "slow");

})

$( function() {
    $( "#reporte_fecha_i" ).datepicker({dateFormat: "dd/mm/yy"});
     $( "#reporte_fecha_f" ).datepicker({dateFormat: "dd/mm/yy"});
  } );

$("input[name='tipopago']").click(function() {
    if ($(this).val() == "Efectivo") { $(".tarjeta_wrapper").hide("slide", { direction: "up" }, "slow");
        $("#pagar_checkout").removeAttr("disabled") } else {
        $(".tarjeta_wrapper").show("slide", { direction: "up" }, "slow");
        $("#pagar_checkout").attr("disabled", "disabled");
    }

})

$("#ingresar_usuario").click(function(){
		usuario = sessionStorage.getItem('user')
		password = sessionStorage.getItem('password')

		if($.trim($("#user_log").val()) == $.trim(usuario)  && $.trim($("#password_log").val()) == $.trim(password)  ){
			$(".login_usuario").hide("slide", { direction: "left" }, "slow");

			 $("#user").html(sessionStorage.getItem('user'));
	        $("#u_dni").html(String(sessionStorage.getItem('dni')));
	        $("#u_place").html(sessionStorage.getItem('place'));
	        $("#u_phone").html(sessionStorage.getItem('phone'));

	        $("#greeting_usuario").html("Hola, " +sessionStorage.getItem('user') )
		}
		else{
			$("#error_login").html("El usuario y contraseña no son validos!")
		}

		
	})

$("#registro_usuario").click(function(){
	$("#user_reg").val("Franco")
	$("#dni").val("07705856")
	$("#phone").val("998112591")
	$("#password_reg").val("1234")
	$("#r_password").val("1234")
})
$("#registrarme_usuario").click(function() {
        if ($("#user_reg").val().length > 0 && $("#dni").val().length > 0 && $("#password_reg").val().length > 0 && $("#r_password").val().length > 0) {
            sessionStorage.setItem('user', $("#user_reg").val())
            sessionStorage.setItem('password', $("#password_reg").val())
            sessionStorage.setItem('dni', $("#dni").val())
            sessionStorage.setItem('place', $("#place").val())
            sessionStorage.setItem('phone', $("#phone").val())
            $("#cerrar_registro").click()
        } else {
            $("#error_registro").html("Debes completar todos los campos!")

        }
    })
function ActualizarCarrito() {
    var total = 0;
    var defecto = "<div class='margin_30'></div>Tu carrito esta vacío :("
    if (carrito.length > 0)  defecto = ""

    $(".carrito_lista").html(defecto)
    $(".productos_carrito").html(defecto)
    
    for (var i = 0; i < carrito.length; i++) {
        var str = "<div class='row'><div class='col-xs-1'></div><div class='col-xs-5'>" + carrito[i].producto + "</div><div class='col-xs-3'> S./ " + carrito[i].subtotal + "</div></div>"
        var str_prod = "<div class='margin_10'></div><div class='row'><div class='col-xs-1'></div><div class='col-xs-2'>" + carrito[i].vendedor + "</div><div class='col-xs-3'>" + carrito[i].producto + "</div><div class='col-xs-2'>" + carrito[i].qty + "</div><div class='col-xs-2'>" + carrito[i].subtotal + "</div><div class='col-xs-1'> <button type='button' class='btn btn-danger remove_item' pk='" + i + "'><span class='glyphicon glyphicon-remove'></span></button> </div></div>"
        $(".carrito_lista").append(str)
        $(".productos_carrito").append(str_prod)
        total += parseFloat(carrito[i].subtotal)
    }
    $("#total_carrito").html("S./ " + total.toFixed(2))
    $("#carrito_total").html("S./ " + total.toFixed(2))

    $("#total_checkout").html("S./ " + total.toFixed(2))
    if (carrito.length > 0) $("#pagar_carrito").removeAttr("disabled");
    else { $("#pagar_carrito").attr("disabled", "disabled"); }
}


$("#ver_registro").click(function(){
	$(".registro_usuario").show("slide", {
        direction: "left"
    }, "slow");
})

$("#cerrar_registro").click(function(){
	$(".registro_usuario").hide("slide", {
        direction: "left"
    }, "slow");
})
$("#cerrar_carrito").click(function() {
    $(".carrito").hide("slide", {
        direction: "down"
    }, "slow");
})

$(".ver_carrito").click(function() {
    $(".carrito").show("slide", {
        direction: "down"
    }, "slow");
})
$(".ver_pedidos").click(function() {
    $(".pedidos").show("slide", {
        direction: "down"
    }, "slow");
})
$("#cerrar_pedidos").click(function() {
    $(".pedidos").hide("slide", {
        direction: "down"
    }, "slow");
})
$(".ver_pedidos_comerciante").click(function() {
    $(".pedidos_comerciante").show("slide", {
        direction: "down"
    }, "slow");
})
$("#cerrar_pedidos_comerciante").click(function() {
    $(".pedidos_comerciante").hide("slide", {
        direction: "down"
    }, "slow");
})


$(".ver_home_usuario").click(function() {
    $(".perfil_usuario").hide("slide", {
        direction: "right"
    }, "slow");
    $(".home_usuario").show("slide", {
        direction: "left"
    }, "slow");
})

$(".ver_home_comerciante").click(function() {
    $(".perfil_comerciante").hide("slide", {
        direction: "right"
    }, "slow");
    $(".home_comerciante").show("slide", {
        direction: "left"
    }, "slow");
})

$("#ver_perfil_usuario").click(function() {
    $(".perfil_usuario").show("slide", {
        direction: "right"
    }, "slow");
})
$("#ver_perfil_comerciante").click(function() {
    $(".perfil_comerciante").show("slide", {
        direction: "right"
    }, "slow");
})
$("#cerrar_checkout").click(function() {
    $(".checkout").hide("slide", {
        direction: "down"
    }, "slow");

})

$("#pagar_carrito").click(function() {

    $(".checkout").show("slide", {
            direction: "down"
        }, "slow", function() {
            $(".carrito").hide("slide", {
                direction: "down"
            }, "slow")
        }

    );


})
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}
$(".form_reporte").on("keydown keyup change", function(){
	f_inicio = $("#reporte_fecha_i").val()
	f_fin = $("#reporte_fecha_f").val()
	producto = $("#reporte_producto").val()
	if( String(f_inicio).length > 6 &&
		  String(f_fin).length > 6 &&
		   String(producto).length > 3 ){
		$("#buscar_reporte").removeAttr("disabled")
	}
	else{$("#buscar_reporte").attr("disabled", "disabled")}
})


$("#buscar_reporte").click(function(){
	$(".resultados_reporte").html("")
	f_inicio = $("#reporte_fecha_i").val()
	f_fin = $("#reporte_fecha_f").val()
	producto = $("#reporte_producto").val()
	for (var i = pedidos.length - 1; i >= 0; i--) {
		if (pedidos[i].vendedor == "Juanita" 
			&& stringToDate(pedidos[i].fecha, "mm/dd/yyyy", "/") > stringToDate(f_inicio, "dd/mm/yyyy", "/")
		 	&& stringToDate(pedidos[i].fecha, "mm/dd/yyyy", "/") < stringToDate(f_fin, "dd/mm/yyyy", "/")){
			for (var j= 0; j < pedidos[i].carrito.length; j++){
				if (pedidos[i].carrito[j].producto == producto){
					var str = '<div class="row"> \
                                    <div class="col-xs-2"></div> \
                                    <div class="col-xs-3"> \
                                        <h4 class="faded">' + pedidos[i].numeroOC+ '</h4></div> \
                                    <div class="col-xs-3"> \
                                        <h4 class="faded">' + pedidos[i].carrito[j].qty+ '</h4></div> \
                                </div>'
					$(".resultados_reporte").append(str)
				}
			}


		}
	}
	$(".resultado_reportes_comerciante").show("slide", {
        direction: "down"
    }, "slow");
})
$("#borrar_carrito").click(function(){
	sessionStorage.removeItem("carrito")
	carrito = []
	ActualizarCarrito()
})
$("#llenarCCInfo").click(function(){
	$("#cc_number").val("2032 2320 0565 9993")
	$("#ccv").val("332")
	$("#fecha_vencimiento").val("06/2019")
	$("#fecha_vencimiento").keyup()
})
$("#ingresarProductosCarrito").click(function(){
	for (var i = 0; i < 10; i++){
		if (Math.random()>0.33){
			vendedor = "Luis"
			if (Math.random()>0.66)
				vendedor = "Pedrito"
		}
		else{
			vendedor ="Juanita"
		}
		qty = parseFloat(Math.random()*10).toFixed(2)
		producto = availableTags[parseInt(Math.random()*14)]
		precio = parseFloat(Math.random()*10).toFixed(2)
		subtotal = (qty * precio).toFixed(2);
		nueva_compra = new Producto(vendedor, qty, producto, precio, subtotal);
    	carrito.push(nueva_compra)
	}
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    ActualizarCarrito()
})


$("#reiniciarPedidos").click(function(){
	 for (var i = 0; i < pedidos.length; i++) {
		pedidos[i].estado = "Pendiente"
	    sessionStorage.setItem("pedidos", JSON.stringify(pedidos))
	}
	ActualizarPedidos()
})

function ActualizarPedidos() {
    $(".pedidos_usuario").html("")
    $(".l_pedidos_comerciante").html("")
    
    for (var i = 0; i < pedidos.length; i++) {
        var str = "<div class='margin_30'></div><div class='row'><div class='col-xs-1'></div> \
        			<div class='col-xs-3'>" + pedidos[i].vendedor + "</div> \
        			<div class='col-xs-3'>" + pedidos[i].fecha + "</div> \
        			<div class='col-xs-3 " + ((pedidos[i].estado == "Pendiente") ? "text-danger" : "text-success" )+ "' > " + pedidos[i].estado + "</div></div>"
        var str_com = "<div class='margin_30'></div><div class='row'><div class='col-xs-1'></div> \
        			<div class='col-xs-3'>" + pedidos[i].numeroOC + "</div> \
        			<div class='col-xs-3'>" + pedidos[i].fecha + "</div> \
        			<div class='col-xs-4' > <span class='" + ((pedidos[i].estado == "Pendiente") ? "btn btn-sm btn-danger entregar_pedido' pk='"+i : "text-success" ) + "'>"+ pedidos[i].estado+ "</span></div></div>"
        $(".pedidos_usuario").append(str)
        if (pedidos[i].vendedor == "Juanita")
         $(".l_pedidos_comerciante").append(str_com)
    }
    
}

$(document).on("click", ".entregar_pedido", function(){
	var i = $(this).attr("pk")
	 if (i > -1) {
        pedidos[i].estado = "Listo"
        sessionStorage.setItem("pedidos", JSON.stringify(pedidos))
        sessionStorage.setItem("notificacion_u", JSON.stringify(pedidos[i]))
        ActualizarPedidos()
    }
})
$("#pagar_checkout").click(function() {

    arr_luis = []
    arr_juanita = []
    arr_pedrito = []

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].vendedor == "Luis") arr_luis.push(carrito[i])
        if (carrito[i].vendedor == "Pedrito") arr_pedrito.push(carrito[i])
        if (carrito[i].vendedor == "Juanita") arr_juanita.push(carrito[i])
    }

    if (arr_luis.length > 0) {
        objeto = new Pedido(usuario, arr_luis, "Luis")
        pedidos.push(objeto)
    }
    if (arr_juanita.length > 0) {
        objeto = new Pedido(usuario, arr_juanita, "Juanita")
        pedidos.push(objeto)
    }
    if (arr_pedrito.length > 0) {
        objeto = new Pedido(usuario, arr_pedrito, "Pedrito")
        pedidos.push(objeto)
    }
    carrito = []
      sessionStorage.setItem("carrito", JSON.stringify(carrito))
    ActualizarCarrito()
    ActualizarPedidos()
    sessionStorage.setItem("pedidos", JSON.stringify(pedidos))
 	sessionStorage.setItem("notificacion_c", "yolo")
    $("#cerrar_checkout").click()
})

$("#hacer_pedidos").click(function() {
    $(".home_usuario").hide("slide", {
        direction: "left"
    }, "slow");
})

$(document).on("click", ".remove_item", function() {
    if ($(this).attr("pk") > -1) {
        carrito.splice($(this).attr("pk"), 1);
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
        ActualizarCarrito()
    }
})

$("#add_2_cart").click(function() {
    vendedor = $("#tu_vendedor").html()
    qty = parseFloat($("#qty").val())
    producto = $("#tu_producto").html()
    precio = parseFloat($("#tu_precio").html().substring(3))
    subtotal = parseFloat($("#sub_total").html())
    nueva_compra = new Producto(vendedor, qty, producto, precio, subtotal);
    carrito.push(nueva_compra)
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    $("#qty").val("")
    $("#producto").val("")
    $("#producto").focus()
    $("#cancelar_cantidades").click();
    $("#cancelar").click();
    ActualizarCarrito();

})

$(".payment-info").on("keydown keyup change", function() {
    if ($("#fecha_vencimiento").val().length > 6 && $("#ccv").val().length > 2 && $("#cc_number").val().length > 18) { $("#pagar_checkout").removeAttr("disabled") } else { $("#pagar_checkout").attr("disabled", "disabled") }
})

$("#qty").keyup(function() {
    $("#sub_total").html((parseFloat($("#qty").val()) * parseFloat($("#tu_precio").html().substring(3))).toFixed(2))
})
$("#buscar").click(function() {
    $("#producto").keydown()
})

$(".comprar_luis").click(function() {
    $("#tu_vendedor").html("Luis")
    $("#tu_precio").html($("#precio_luis").html())
    $("#tu_producto").html($("#producto").val())
    $(".cantidades").show("slide", {
        direction: "down"
    }, "slow");
})

$(".comprar_pedrito").click(function() {
    $("#tu_vendedor").html("Pedrito")
    $("#tu_precio").html($("#precio_pedrito").html())
    $("#tu_producto").html($("#producto").val())
    $(".cantidades").show("slide", {
        direction: "down"
    }, "slow");
})

$(".comprar_juanita").click(function() {
    $("#tu_vendedor").html("Juanita")
    $("#tu_precio").html($("#precio_juanita").html())
    $("#tu_producto").html($("#producto").val())
    $(".cantidades").show("slide", {
        direction: "down"
    }, "slow");
})

$("#cancelar_cantidades").click(function() {
    $(".cantidades").hide("slide", {
        direction: "down"
    }, "slow");
})

$("#cancelar").click(function() {
    $(".opciones").hide("slide", {
        direction: "down"
    }, "slow");
})

usuario = sessionStorage.getItem('user')
var availableTags = []
$(function() {
     availableTags = [
        "Manzanas",
        "Peras",
        "Platanos",
        "Cebollas",
        "Azucar",
        "Tomates",
        "Papa amarilla",
        "Queso",
        "Limones",
        "Carne de Vaca",
        "Carne de Chancho",
        "Apio",
        "Poro",
        "Tallarines",
        "Papa blanca",
        "Ajos"
    ];
    $("#producto").autocomplete({
        source: availableTags,
        select: function(event, ui) {
            $("#precio_juanita").html("S/. " + (Math.random() * 10).toFixed(2))
            $("#precio_luis").html("S/. " + (Math.random() * 10).toFixed(2))
            $("#precio_pedrito").html("S/. " + (Math.random() * 10).toFixed(2))
            $(".opciones").show("slide", {
                direction: "down"
            }, "slow");

        }
    });
     $("#reporte_producto").autocomplete({
        source: availableTags,
        select: function(event, ui) {
           $(".form_reporte").keydown()
        }
    });
});
