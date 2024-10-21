<?php
// Datos de conexión a MySQL
$host = "par-mysql-c6-n1";
$db_name = "babfmxcjwksmvdojuuc0";
$username = "uj9hyo5vh2aokgmy@%";
$password = "yhDy5gSLjnlb6DSdCWzS";

try {
    // Conectar a la base de datos usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener los productos
    $sql = "SELECT * FROM productos";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Recuperar los productos como un array asociativo
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los productos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($productos);

} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
}
?>