/**
 * Higgs Dashboard - JavaScript
 * Funcionalidad para el dashboard moderno de Higgs
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sqlEditor = document.getElementById('sqlEditor');
    const runQueryBtn = document.getElementById('runQuery');
    const clearQueryBtn = document.getElementById('clearQuery');
    const saveQueryBtn = document.getElementById('saveQuery');
    const connectionSelector = document.getElementById('connectionSelector');
    const resultsContainer = document.getElementById('resultsContainer');
    const sqlLoader = document.getElementById('sqlLoader');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const toggleLeftSidebarBtn = document.getElementById('toggleLeftSidebar');
    const toggleRightSidebarBtn = document.getElementById('toggleRightSidebar');
    const leftSidebar = document.querySelector('.left-sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');
    
    // Toggle para la barra lateral (legacy)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // Guardar estado en localStorage
            const sidebarCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
        });
        
        // Comprobar si hay un estado guardado
        const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        }
    }
    
    // Toggle del sidebar izquierdo
    if (toggleLeftSidebarBtn && leftSidebar) {
        toggleLeftSidebarBtn.addEventListener('click', function() {
            if (leftSidebar) {
                leftSidebar.classList.toggle('collapsed');
                if (mainContent) {
                    mainContent.classList.toggle('expanded-left');
                }
                
                // Guardar el estado en localStorage
                const isCollapsed = leftSidebar.classList.contains('collapsed');
                localStorage.setItem('leftSidebarCollapsed', isCollapsed);
                
                // Cambiar el icono del botón
                const icon = this.querySelector('i');
                if (icon) {
                    if (isCollapsed) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-angle-right');
                    } else {
                        icon.classList.remove('fa-angle-right');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
        
        // Recuperar el estado guardado
        const isLeftCollapsed = localStorage.getItem('leftSidebarCollapsed') === 'true';
        if (isLeftCollapsed && leftSidebar) {
            leftSidebar.classList.add('collapsed');
            if (mainContent) {
                mainContent.classList.add('expanded-left');
            }
            const icon = toggleLeftSidebarBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-angle-right');
            }
        }
    }
    
    // Toggle del sidebar derecho
    if (toggleRightSidebarBtn && rightSidebar) {
        toggleRightSidebarBtn.addEventListener('click', function() {
            if (rightSidebar) {
                rightSidebar.classList.toggle('collapsed');
                if (mainContent) {
                    mainContent.classList.toggle('expanded-right');
                }
                
                // Guardar el estado en localStorage
                const isCollapsed = rightSidebar.classList.contains('collapsed');
                localStorage.setItem('rightSidebarCollapsed', isCollapsed);
                
                // Cambiar el icono del botón
                const icon = this.querySelector('i');
                if (icon) {
                    if (isCollapsed) {
                        icon.classList.remove('fa-cog');
                        icon.classList.add('fa-angle-left');
                    } else {
                        icon.classList.remove('fa-angle-left');
                        icon.classList.add('fa-cog');
                    }
                }
            }
        });
        
        // Recuperar el estado guardado
        const isRightCollapsed = localStorage.getItem('rightSidebarCollapsed') === 'true';
        if (isRightCollapsed && rightSidebar) {
            rightSidebar.classList.add('collapsed');
            if (mainContent) {
                mainContent.classList.add('expanded-right');
            }
            const icon = toggleRightSidebarBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-cog');
                icon.classList.add('fa-angle-left');
            }
        }
    }
    
    // Manejar la ejecución de consultas SQL
    if (runQueryBtn && sqlEditor) {
        runQueryBtn.addEventListener('click', function() {
            const query = sqlEditor.value.trim();
            if (!query) {
                showNotification('Por favor, escribe una consulta SQL', 'warning');
                return;
            }
            
            const connectionId = connectionSelector ? connectionSelector.value : null;
            if (!connectionId) {
                showNotification('Selecciona una conexión primero', 'warning');
                return;
            }
            
            // Mostrar loader
            if (sqlLoader) sqlLoader.classList.add('active');
            
            // Simular la ejecución de la consulta
            setTimeout(function() {
                // Ocultar loader
                if (sqlLoader) sqlLoader.classList.remove('active');
                
                // Mostrar resultados (esto sería reemplazado por los resultados reales de la API)
                if (resultsContainer) {
                    // Detectar el tipo de consulta para mostrar resultados diferentes
                    if (query.toLowerCase().startsWith('select')) {
                        showSelectResults(resultsContainer);
                    } else if (query.toLowerCase().startsWith('insert') || 
                               query.toLowerCase().startsWith('update') || 
                               query.toLowerCase().startsWith('delete')) {
                        showExecutionResults(resultsContainer);
                    } else {
                        showGenericResults(resultsContainer);
                    }
                }
                
                // Guardar la consulta en el historial
                saveToHistory(query);
                
                showNotification('Consulta ejecutada con éxito', 'success');
            }, 1500);
        });
    }
    
    // Limpiar editor SQL
    if (clearQueryBtn && sqlEditor) {
        clearQueryBtn.addEventListener('click', function() {
            sqlEditor.value = '';
            sqlEditor.focus();
        });
    }
    
    // Cambiar el estado de los botones según la selección de conexión
    if (connectionSelector) {
        connectionSelector.addEventListener('change', function() {
            const isConnectionSelected = this.value !== '';
            
            if (runQueryBtn) runQueryBtn.disabled = !isConnectionSelected;
            if (saveQueryBtn) saveQueryBtn.disabled = !isConnectionSelected;
            
            if (sqlEditor) {
                if (isConnectionSelected) {
                    sqlEditor.placeholder = "SELECT * FROM tabla WHERE condicion;";
                    sqlEditor.disabled = false;
                } else {
                    sqlEditor.placeholder = "Selecciona una conexión primero...";
                    sqlEditor.disabled = true;
                }
            }
        });
        
        // Disparar el evento change para establecer el estado inicial
        connectionSelector.dispatchEvent(new Event('change'));
    }
    
    // Guardar consulta (simulado)
    if (saveQueryBtn) {
        saveQueryBtn.addEventListener('click', function() {
            const query = sqlEditor.value.trim();
            if (!query) {
                showNotification('No hay consulta para guardar', 'warning');
                return;
            }
            
            // Aquí iría la lógica para guardar la consulta
            
            showNotification('Consulta guardada correctamente', 'success');
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notificationArea = document.querySelector('.notification-area');
        if (!notificationArea) return;
        
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show`;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;
        
        notificationArea.appendChild(notification);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                notification.remove();
            }, 150);
        }, 5000);
    }
    
    // Función para guardar en el historial (simulado)
    function saveToHistory(query) {
        const historyList = document.getElementById('queryHistory');
        if (!historyList) return;
        
        const historyItem = document.createElement('a');
        historyItem.className = 'list-group-item list-group-item-action';
        historyItem.href = '#';
        
        // Truncar la consulta si es muy larga
        const truncatedQuery = query.length > 50 ? query.substring(0, 47) + '...' : query;
        
        historyItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">${truncatedQuery}</p>
                <small>${new Date().toLocaleTimeString()}</small>
            </div>
        `;
        
        // Agregar al principio de la lista
        historyList.insertBefore(historyItem, historyList.firstChild);
        
        // Limitar a 10 elementos
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
        
        // Hacer que el elemento sea clickeable para cargar la consulta
        historyItem.addEventListener('click', function(e) {
            e.preventDefault();
            sqlEditor.value = query;
            sqlEditor.focus();
        });
    }
    
    // Función para mostrar resultados de SELECT (simulado)
    function showSelectResults(container) {
        container.innerHTML = `
            <div class="table-responsive">
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Producto A</td>
                            <td>Electrónica</td>
                            <td>$599.99</td>
                            <td>45</td>
                            <td>2025-03-15</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Producto B</td>
                            <td>Hogar</td>
                            <td>$129.50</td>
                            <td>12</td>
                            <td>2025-04-22</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Producto C</td>
                            <td>Electrónica</td>
                            <td>$899.99</td>
                            <td>8</td>
                            <td>2025-05-10</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Producto D</td>
                            <td>Ropa</td>
                            <td>$49.99</td>
                            <td>120</td>
                            <td>2025-02-28</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Producto E</td>
                            <td>Alimentos</td>
                            <td>$12.75</td>
                            <td>85</td>
                            <td>2025-05-20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-3">
                <p class="text-muted">5 filas devueltas. Tiempo de ejecución: 0.023s</p>
            </div>
        `;
    }
    
    // Función para mostrar resultados de INSERT/UPDATE/DELETE (simulado)
    function showExecutionResults(container) {
        container.innerHTML = `
            <div class="alert alert-success">
                <h4 class="alert-heading">Operación completada</h4>
                <p>La operación se ha ejecutado correctamente.</p>
                <hr>
                <p class="mb-0">Filas afectadas: 3</p>
                <p class="mb-0">Tiempo de ejecución: 0.035s</p>
            </div>
        `;
    }
    
    // Función para mostrar resultados genéricos (simulado)
    function showGenericResults(container) {
        container.innerHTML = `
            <div class="alert alert-info">
                <h4 class="alert-heading">Consulta ejecutada</h4>
                <p>La consulta se ha ejecutado correctamente.</p>
                <hr>
                <p class="mb-0">Tiempo de ejecución: 0.018s</p>
            </div>
        `;
    }
    
    // Funcionalidad para el botón de pantalla completa
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                // Entrar en modo pantalla completa
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                    document.documentElement.msRequestFullscreen();
                }
                fullscreenBtn.querySelector('i').classList.remove('fa-expand');
                fullscreenBtn.querySelector('i').classList.add('fa-compress');
            } else {
                // Salir del modo pantalla completa
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
                fullscreenBtn.querySelector('i').classList.remove('fa-compress');
                fullscreenBtn.querySelector('i').classList.add('fa-expand');
            }
        });
        
        // Detectar cambios en el estado de pantalla completa
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                fullscreenBtn.querySelector('i').classList.remove('fa-compress');
                fullscreenBtn.querySelector('i').classList.add('fa-expand');
            }
        });
    }
    
    // Funcionalidad para el botón de modo oscuro/claro
    if (darkModeBtn) {
        // Verificar si hay una preferencia guardada
        let isDarkMode = localStorage.getItem('darkMode');
        
        // Si no hay preferencia guardada, establecer modo claro como predeterminado
        if (isDarkMode === null) {
            localStorage.setItem('darkMode', 'false');
            isDarkMode = 'false';
        }
        
        // Convertir a booleano
        isDarkMode = isDarkMode === 'true';
        
        // Aplicar el modo oscuro si estaba activado anteriormente
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            // Cambiar el icono a sol cuando está en modo oscuro
            const icon = darkModeBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
        
        // Manejar el evento de clic en el botón
        darkModeBtn.addEventListener('click', function() {
            // Alternar la clase dark-mode en el body
            document.body.classList.toggle('dark-mode');
            
            // Determinar si el modo oscuro está activo después del toggle
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Guardar la preferencia en localStorage
            localStorage.setItem('darkMode', isDarkMode);
            
            // Cambiar el icono según el modo
            const icon = this.querySelector('i');
            if (icon) {
                if (isDarkMode) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
