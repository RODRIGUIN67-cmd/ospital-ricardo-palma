window.onload = function() {
    mostrarLogin();
};

function mostrarLogin() {
    document.body.style.backgroundColor = '#f4f4f9';
    document.body.innerHTML = ''; 

    const contenedor = document.createElement('div');
    contenedor.style.margin = '50px auto';
    contenedor.style.width = '300px';
    contenedor.style.padding = '30px';
    contenedor.style.background = 'white';
    contenedor.style.textAlign = 'center';
    contenedor.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; 
    contenedor.style.borderRadius = '8px';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Login Hospital';

    const inputU = document.createElement('input'); 
    inputU.placeholder = 'Usuario';
    inputU.style.display = 'block';
    inputU.style.margin = '15px auto';
    inputU.style.padding = '8px';
    inputU.style.width = '90%';

    const inputP = document.createElement('input'); 
    inputP.type = 'password'; 
    inputP.placeholder = 'Clave';
    inputP.style.display = 'block';
    inputP.style.margin = '15px auto';
    inputP.style.padding = '8px';
    inputP.style.width = '90%';

    const btn = document.createElement('button'); 
    btn.textContent = 'Ingresar';
    btn.style.padding = '10px 20px';
    btn.style.cursor = 'pointer';
    btn.style.background = '#0056b3';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';

    btn.onclick = () => {
        const u = inputU.value.trim();
        const p = inputP.value.trim();
        const rutaSegura = 'LoginServlet?usuario=' + encodeURIComponent(u) + '&clave=' + encodeURIComponent(p);

        fetch(rutaSegura, { method: 'POST' })
        .then(res => res.text())
        .then(texto => {
            if(texto.trim() === 'OK') {
                mostrarMenuPrincipal();
            } else {
                alert('Error: Usuario o clave incorrectos.');
            }
        })
        .catch(err => {
            alert('Error de conexión con el servidor.');
        });
    };

    contenedor.append(titulo, inputU, inputP, btn);
    document.body.appendChild(contenedor);
}

// --- MENÚ PRINCIPAL ---
function mostrarMenuPrincipal() {
    document.body.innerHTML = ''; 

    const dashboard = document.createElement('div');
    dashboard.style.margin = '50px auto';
    dashboard.style.width = '500px';
    dashboard.style.padding = '30px';
    dashboard.style.background = 'white';
    dashboard.style.textAlign = 'center';
    dashboard.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    dashboard.style.borderRadius = '8px';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Hospital Ricardo Palma - Menú Principal';
    
    const bienvenida = document.createElement('p');
    bienvenida.textContent = 'Bienvenida al sistema de gestión clínica, Abigail.';
    bienvenida.style.marginBottom = '20px';

    const btnPacientes = crearBotonMenu('Gestión de Pacientes', '#0056b3');
    const btnCitas = crearBotonMenu('Citas Médicas', '#0056b3');
    const btnReportes = crearBotonMenu('Reportes del Sistema', '#28a745'); 
    const btnSalir = crearBotonMenu('Cerrar Sesión', '#dc3545'); 

    // Aquí conectamos los botones con sus respectivas pantallas
    btnPacientes.onclick = () => mostrarVista('Gestión de Pacientes', `
        <p>Ingrese los datos del nuevo paciente:</p>
        <input type="text" placeholder="DNI" style="margin:5px; padding:5px; width:80%;">
        <input type="text" placeholder="Nombre Completo" style="margin:5px; padding:5px; width:80%;">
        <input type="text" placeholder="Teléfono" style="margin:5px; padding:5px; width:80%;">
        <button style="margin-top:15px; padding:8px 15px; background:#28a745; color:white; border:none; border-radius:4px;">Guardar Paciente</button>
    `);

    btnCitas.onclick = () => mostrarVista('Citas Médicas', `
        <p>Agendar nueva cita para consultorio:</p>
        <select style="margin:5px; padding:5px; width:80%;">
            <option>Cardiología</option>
            <option>Pediatría</option>
            <option>Medicina General</option>
        </select>
        <input type="date" style="margin:5px; padding:5px; width:80%;">
        <button style="margin-top:15px; padding:8px 15px; background:#0056b3; color:white; border:none; border-radius:4px;">Reservar Cita</button>
    `);

    btnReportes.onclick = () => mostrarVista('Reportes del Sistema', `
        <p><strong>Estadísticas del día:</strong></p>
        <ul style="text-align:left; display:inline-block;">
            <li>Pacientes registrados hoy: <strong>14</strong></li>
            <li>Citas completadas: <strong>42</strong></li>
            <li>Camas disponibles: <strong>8</strong></li>
        </ul>
    `);
    
    btnSalir.onclick = () => {
        location.reload(); 
    };

    dashboard.append(titulo, bienvenida, btnPacientes, btnCitas, btnReportes, btnSalir);
    document.body.appendChild(dashboard);
}

// --- FUNCIÓN PARA MOSTRAR LAS PANTALLAS INTERNAS ---
function mostrarVista(tituloVista, contenidoHTML) {
    document.body.innerHTML = ''; 

    const vista = document.createElement('div');
    vista.style.margin = '50px auto';
    vista.style.width = '500px';
    vista.style.padding = '30px';
    vista.style.background = 'white';
    vista.style.textAlign = 'center';
    vista.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    vista.style.borderRadius = '8px';

    vista.innerHTML = `<h2>${tituloVista}</h2><hr><div style="margin: 20px 0;">${contenidoHTML}</div>`;

    const btnVolver = document.createElement('button');
    btnVolver.textContent = '← Volver al Menú';
    btnVolver.style.marginTop = '20px';
    btnVolver.style.padding = '10px 20px';
    btnVolver.style.background = '#6c757d'; // Color gris
    btnVolver.style.color = 'white';
    btnVolver.style.border = 'none';
    btnVolver.style.borderRadius = '4px';
    btnVolver.style.cursor = 'pointer';
    
    btnVolver.onclick = mostrarMenuPrincipal;

    vista.appendChild(btnVolver);
    document.body.appendChild(vista);
}

// Función auxiliar de estilos
function crearBotonMenu(texto, colorFondo) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.style.display = 'block';
    btn.style.width = '80%';
    btn.style.margin = '10px auto';
    btn.style.padding = '12px';
    btn.style.cursor = 'pointer';
    btn.style.background = colorFondo;
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.fontSize = '16px';
    btn.style.fontWeight = 'bold';
    return btn;
}