function validarLogin() {
    if (sessionStorage.getItem('user') != null)
        return true;
    else {
        return false
    }
}


$(document).ready(function() {

    if (validarLogin()) {


        $("#user").html(sessionStorage.getItem('user'));
        $("#dni").html(sessionStorage.getItem('dni'));
        $("#place").html(sessionStorage.getItem('place'));
        $("#phone").html(sessionStorage.getItem('phone'));
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


$("input[name='tipopago']").click(function() {
    if ($(this).val() == "Efectivo") { $(".tarjeta_wrapper").hide("slide", { direction: "up" }, "slow");
        $("#pagar_checkout").removeAttr("disabled") } else {
        $(".tarjeta_wrapper").show("slide", { direction: "up" }, "slow");
        $("#pagar_checkout").attr("disabled", "disabled");
    }

})

function ActualizarCarrito() {
    var total = 0;
    $(".carrito_lista").html("")
    $(".productos_carrito").html("")
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
        /*pedidos[i].estado = "Pendiente"
        sessionStorage.setItem("pedidos", JSON.stringify(pedidos)) */// reinicia pedidos
        $(".pedidos_usuario").append(str)
         $(".l_pedidos_comerciante").append(str_com)
    }
    
}

$(document).on("click", ".entregar_pedido", function(){
	var i = $(this).attr("pk")
	 if (i > -1) {
        pedidos[i].estado = "Entregado"
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

$(function() {
    var availableTags = [
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
});
