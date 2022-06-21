const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");

const usuariosController = require("../controllers/usuariosController");
const usuarioPruebaController = require("../controllers/usuarioPruebaController");

/**Middleware para proteger las rutas */
const auth = require("../middleware/auth");
// const UsuarioPrueba = require("../models/UsuarioPrueba");

module.exports = function () {
  /**CLIENTES */

  //Agrega nuevos clientes via POST
  router.post("/clientes", clienteController.nuevoCliente);

  //Obtener todos los clientes via GET
  router.get("/clientes", clienteController.mostrarClientes);

  //Muestra un cliente en especifico (ID)
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  //Actualizar cliente
  router.put("/clientes/:idCliente", clienteController.actualizarCliente);

  //Eliminar cliente
  router.delete("/clientes/:idCliente", clienteController.eliminarCliente);

  /**PRODUCTOS */

  //Agregar nuevos productos
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  //Muestra todos los productos
  router.get("/productos", auth, productosController.mostrarProductos);

  //Muestra producto por ID
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );

  //Actualizar producto
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  //Eliminar producto
  router.delete("/productos/:idProducto", productosController.eliminarProducto);

  //Busqueda de productos
  router.post("/productos/busqueda/:query", productosController.buscarProducto);

  /**PEDIDOS */

  //Agrega nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", pedidosController.nuevoPedido);

  //Mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  //Mostrar un pedido por su ID
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  //Actualizar pedidos
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  //Eliminar un pedido
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  /**Usuarios */
  router.post("/crear-cuenta", auth, usuariosController.registrarUsuarios);

  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

  router.post("/forget-password", usuarioPruebaController.validarCorreo);

  router.post("/reset-password", usuarioPruebaController.actualizarPasswordd);

  return router;
};
