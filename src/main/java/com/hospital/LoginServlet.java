package com.hospital;

import java.io.IOException;
// ¡AQUÍ ESTÁ LA MAGIA! Cambiamos javax por jakarta
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write("<h1>¡HOLA ABIGAIL, EL SERVLET DEL HOSPITAL ESTA VIVO!</h1>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String u = request.getParameter("usuario");
        String p = request.getParameter("clave");
        
        System.out.println("DEBUG: Usuario recibido: [" + u + "]");
        System.out.println("DEBUG: Clave recibida: [" + p + "]");

        if ("admin".equals(u) && "12345".equals(p)) {
            response.getWriter().write("OK");
        } else {
            response.getWriter().write("ERROR");
        }
    } 
}