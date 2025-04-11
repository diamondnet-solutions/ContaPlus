import { useState, useEffect } from "react";
import {
    Calendar,
    ChevronRight,
    DollarSign,
    FileText,
    Home,
    Package,
    PieChart,
    ShoppingCart,
    User,
    AlertTriangle,
    Clock,
    Moon,
    Sun,
    ChevronLeft,
    Menu,
    Plus,
    BarChart3,
    Store,
    TrendingUp,
    Info,
    ListFilter
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function SistemaContable() {
    const [regimen, setRegimen] = useState("NRUS");
    const [periodo, setPeriodo] = useState({
        mes: "ABRIL",
        año: "2025"
    });
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const estadoContribuyente = "ACTIVO";
    const fechaVencimiento = "15/05/2025";
    const diasRestantes = 5;

    // Datos para el resumen financiero
    const resumenFinanciero = {
        ventas: 45680.25,
        compras: 28950.75,
        igv: 3456.50,
        rentaMensual: 1675.25,
        utilidadNeta: 11597.75
    };

    // Datos para gráficos
    const datosVentasMensuales = [
        { mes: "Ene", ventas: 32500.50, compras: 24800.30 },
        { mes: "Feb", ventas: 38600.75, compras: 26200.45 },
        { mes: "Mar", ventas: 41200.25, compras: 27800.60 },
        { mes: "Abr", ventas: 45680.25, compras: 28950.75 },
        { mes: "May", ventas: 0, compras: 0 },
        { mes: "Jun", ventas: 0, compras: 0 }
    ];

    const datosCategorias = [
        { nombre: "Abarrotes", valor: 18500.25 },
        { nombre: "Bebidas", valor: 12300.75 },
        { nombre: "Limpieza", valor: 8600.50 },
        { nombre: "Snacks", valor: 6279.75 }
    ];

    const meses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    // Verificar si estamos en móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Clases dinámicas basadas en el modo oscuro
    const themeClasses = {
        background: darkMode ? "bg-gray-900" : "bg-gray-100",
        sidebar: darkMode ? "bg-gray-800 text-white" : "bg-indigo-800 text-white",
        sidebarHover: darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-700",
        sidebarActive: darkMode ? "bg-gray-700" : "bg-indigo-700",
        sidebarText: darkMode ? "text-gray-300" : "text-indigo-200",
        card: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        text: darkMode ? "text-gray-100" : "text-gray-800",
        textMuted: darkMode ? "text-gray-400" : "text-gray-500",
        button: darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-indigo-50 hover:bg-indigo-100",
        buttonText: darkMode ? "text-gray-300" : "text-indigo-700",
        header: darkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-sm",
        border: darkMode ? "border-gray-700" : "border-gray-200",
    };

    return (
        <div className={`flex h-screen ${themeClasses.background}`}>
            {/* Sidebar - no mostrar en móvil */}
            {(!isMobile || (isMobile && sidebarOpen)) && (
                <div
                    className={`${themeClasses.sidebar} ${isMobile ? "fixed inset-0 z-50 w-64" : "w-64"} transition-all duration-300 ease-in-out ${sidebarOpen ? "" : "ml-[-16rem]"}`}
                >
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center mb-6">
                            <div className="p-2 rounded-lg bg-white mr-3">
                                <Store className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Pirhuas Mini Market</h2>
                                <p className={`${themeClasses.sidebarText} text-sm`}>Sistema Contable</p>
                            </div>
                        </div>

                        <div className="border-t border-b py-4 mb-6 border-opacity-20 border-white">
                            <div className="text-sm font-medium mb-2">Información Empresa</div>
                            <div className={`${themeClasses.sidebarText} text-xs`}>
                                <p>RUC: 20501367895</p>
                                <p>Ubicación: Valentín</p>
                                <p>Año Fiscal: 2025</p>
                            </div>
                        </div>

                        <nav className="flex-grow">
                            <NavItem icon={<Home />} text="Inicio" active darkMode={darkMode} />
                            <NavItem icon={<PieChart />} text="Resumen Contable" darkMode={darkMode} />
                            <NavItem icon={<ShoppingCart />} text="Registro de Ventas" darkMode={darkMode} />
                            <NavItem icon={<Package />} text="Registro de Compras" darkMode={darkMode} />
                            <NavItem icon={<FileText />} text="Reportes Fiscales" darkMode={darkMode} />
                            <NavItem icon={<DollarSign />} text="Control de Pagos" darkMode={darkMode} />
                            <NavItem icon={<Store />} text="Inventario" darkMode={darkMode} />
                            <NavItem icon={<ListFilter />} text="Proveedores" darkMode={darkMode} />
                            <NavItem icon={<User />} text="Configuración" darkMode={darkMode} />
                        </nav>

                        {!isMobile && (
                            <div className="pt-4 border-t border-opacity-20 border-white">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex items-center px-4 py-2 rounded-md bg-opacity-20 bg-gray-50 text-black w-full"
                                >
                                    {darkMode ? <Sun className="h-4 w-4 mr-2 " /> : <Moon className="h-4 w-4 mr-2" />}
                                    {darkMode ? "Modo Claro" : "Modo Oscuro"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${!sidebarOpen && !isMobile ? "ml-16" : ""}`}>
                {/* Header */}
                <header className={`${themeClasses.header} sticky top-0 z-10`}>
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            {!isMobile && (
                                <button
                                    onClick={toggleSidebar}
                                    className="mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            )}
                            <h1 className={`text-xl md:text-2xl font-bold ${themeClasses.text}`}>
                                CONTROL CONTABLE
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {!isMobile && (
                                <div className={`text-sm ${themeClasses.textMuted}`}>
                                    {periodo.mes} {periodo.año}
                                </div>
                            )}
                            <div className="flex items-center">
                                {isMobile && (
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
                                    >
                                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    </button>
                                )}
                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                    VP
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 md:p-6">
                    {/* Top Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                        {/* Estado Tributario */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-green-500`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className={`text-sm font-medium ${themeClasses.textMuted}`}>RÉGIMEN TRIBUTARIO</h3>
                                    <div className="mt-3">
                                        <select
                                            value={regimen}
                                            onChange={(e) => setRegimen(e.target.value)}
                                            className={`block w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}
                                        >
                                            <option value="NRUS">Nuevo RUS</option>
                                            <option value="RER">Régimen Especial (RER)</option>
                                            <option value="RMT">Régimen MYPE Tributario</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <div className={`h-3 w-3 rounded-full ${estadoContribuyente === "ACTIVO" ? "bg-green-500" : "bg-red-500"}`}></div>
                                    <span className={`ml-2 text-sm font-medium ${themeClasses.text}`}>Estado: {estadoContribuyente}</span>
                                </div>
                            </div>
                        </div>

                        {/* Periodo Tributario */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-blue-500`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className={`text-sm font-medium ${themeClasses.textMuted}`}>PERÍODO TRIBUTARIO</h3>
                                    <div className="mt-3 flex space-x-2">
                                        <select
                                            value={periodo.mes}
                                            onChange={(e) => setPeriodo({...periodo, mes: e.target.value})}
                                            className={`block w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}
                                        >
                                            {meses.map(mes => (
                                                <option key={mes} value={mes}>{mes}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={periodo.año}
                                            onChange={(e) => setPeriodo({...periodo, año: e.target.value})}
                                            className={`block w-24 px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}
                                        >
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </div>

                        {/* Recordatorio SUNAT */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-yellow-500`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className={`text-sm font-medium ${themeClasses.textMuted}`}>RECORDATORIO SUNAT</h3>
                                    <p className={`text-lg font-semibold mt-1 ${themeClasses.text}`}>Vencimiento: {fechaVencimiento}</p>
                                </div>
                                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                                    <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 text-red-500 mr-1" />
                                    <span className="text-sm font-medium text-red-500">Faltan {diasRestantes} días</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Gráfico de Línea */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg`}>
                            <div className={`border-b ${themeClasses.border} px-6 py-4`}>
                                <h2 className={`text-lg font-medium ${themeClasses.text}`}>Tendencia Mensual - Ventas vs Compras</h2>
                            </div>
                            <div className="p-4 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={datosVentasMensuales}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                                        <XAxis dataKey="mes" stroke={darkMode ? "#aaa" : "#666"} />
                                        <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: darkMode ? "#333" : "#fff",
                                                borderColor: darkMode ? "#555" : "#ddd",
                                                color: darkMode ? "#fff" : "#333"
                                            }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="ventas" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} name="Ventas" />
                                        <Line type="monotone" dataKey="compras" stroke="#10b981" strokeWidth={2} name="Compras" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Gráfico de Barras */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg`}>
                            <div className={`border-b ${themeClasses.border} px-6 py-4`}>
                                <h2 className={`text-lg font-medium ${themeClasses.text}`}>Ventas por Categoría</h2>
                            </div>
                            <div className="p-4 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={datosCategorias}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                                        <XAxis dataKey="nombre" stroke={darkMode ? "#aaa" : "#666"} />
                                        <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: darkMode ? "#333" : "#fff",
                                                borderColor: darkMode ? "#555" : "#ddd",
                                                color: darkMode ? "#fff" : "#333"
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="valor" fill="#8884d8" name="Monto (S/)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Resumen Mensual */}
                    <div className={`${themeClasses.card} rounded-lg shadow-lg mb-6`}>
                        <div className={`border-b ${themeClasses.border} px-6 py-4`}>
                            <h2 className={`text-lg font-medium ${themeClasses.text}`}>Resumen Mensual - Determinación de Renta e IGV</h2>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                                <ResumenCard
                                    title="Ventas"
                                    value={resumenFinanciero.ventas.toFixed(2)}
                                    color="bg-blue-500"
                                    icon={<ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                                    textColor={darkMode ? "text-blue-400" : "text-blue-600"}
                                    darkMode={darkMode}
                                />
                                <ResumenCard
                                    title="Compras"
                                    value={resumenFinanciero.compras.toFixed(2)}
                                    color="bg-purple-500"
                                    icon={<Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                                    textColor={darkMode ? "text-purple-400" : "text-purple-600"}
                                    darkMode={darkMode}
                                />
                                <ResumenCard
                                    title="IGV"
                                    value={resumenFinanciero.igv.toFixed(2)}
                                    color="bg-green-500"
                                    icon={<FileText className="h-5 w-5 text-green-600 dark:text-green-400" />}
                                    textColor={darkMode ? "text-green-400" : "text-green-600"}
                                    darkMode={darkMode}
                                />
                                <ResumenCard
                                    title="Renta Mensual"
                                    value={resumenFinanciero.rentaMensual.toFixed(2)}
                                    color="bg-yellow-500"
                                    icon={<DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                                    textColor={darkMode ? "text-yellow-400" : "text-yellow-600"}
                                    darkMode={darkMode}
                                />
                                <ResumenCard
                                    title="Utilidad Neta"
                                    value={resumenFinanciero.utilidadNeta.toFixed(2)}
                                    color="bg-indigo-500"
                                    icon={<PieChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                                    textColor={darkMode ? "text-indigo-400" : "text-indigo-600"}
                                    darkMode={darkMode}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Registros */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Registro de Ventas */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg`}>
                            <div className={`border-b ${themeClasses.border} px-6 py-4 flex justify-between items-center`}>
                                <h2 className={`text-lg font-medium ${themeClasses.text}`}>Registro de Ventas</h2>
                                <button className={`text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 text-sm font-medium`}>
                                    Ver todos
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                                    {meses.slice(0, 6).map(mes => (
                                        <button
                                            key={mes}
                                            className={`px-2 py-2 ${darkMode ? 'bg-indigo-900 hover:bg-indigo-800' : 'bg-indigo-50 hover:bg-indigo-100'} rounded-md ${darkMode ? 'text-indigo-300' : 'text-indigo-700'} text-xs md:text-sm font-medium transition-colors duration-150`}
                                        >
                                            {mes}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Registro de Compras */}
                        <div className={`${themeClasses.card} rounded-lg shadow-lg`}>
                            <div className={`border-b ${themeClasses.border} px-6 py-4 flex justify-between items-center`}>
                                <h2 className={`text-lg font-medium ${themeClasses.text}`}>Registro de Compras</h2>
                                <button className={`text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 text-sm font-medium`}>
                                    Ver todos
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                                    {meses.slice(0, 6).map(mes => (
                                        <button
                                            key={mes}
                                            className={`px-2 py-2 ${darkMode ? 'bg-green-900 hover:bg-green-800' : 'bg-green-50 hover:bg-green-100'} rounded-md ${darkMode ? 'text-green-300' : 'text-green-700'} text-xs md:text-sm font-medium transition-colors duration-150`}
                                        >
                                            {mes}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Bottom Navigation Bar for Mobile */}
            {isMobile && (
                <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex justify-around items-center py-3 z-20`}>
                    <MobileNavItem icon={<Home />} label="Inicio" active={true} />
                    <MobileNavItem icon={<ShoppingCart />} label="Ventas" />
                    <div className="relative">
                        <button className="bg-indigo-600 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg">
                            <Plus className="h-6 w-6" />
                        </button>
                    </div>
                    <MobileNavItem icon={<Package />} label="Compras" />
                    <MobileNavItem icon={<PieChart />} label="Resumen" />
                </div>
            )}
        </div>
    );
}

// Componente para ítems de navegación
function NavItem({ icon, text, active = false, darkMode }) {
    const activeClass = darkMode
        ? "text-white bg-gray-700"
        : "text-white bg-indigo-700";

    const inactiveClass = darkMode
        ? "text-gray-300 hover:text-white hover:bg-gray-700"
        : "text-indigo-200 hover:text-white hover:bg-indigo-700";

    return (
        <a
            href="#"
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                active ? activeClass : inactiveClass
            }`}
        >
            <span className="mr-3">{icon}</span>
            {text}
            {active && <ChevronRight className="ml-auto h-5 w-5" />}
        </a>
    );
}

// Componente para las tarjetas de resumen
function ResumenCard({ title, value, color, icon, textColor, darkMode }) {
    return (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-4 border shadow-md transition-transform hover:scale-105`}>
            <div className="flex items-center">
                <div className={`p-2 rounded-full ${color.replace('bg-', darkMode ? 'bg-opacity-20' : 'bg-opacity-10')}`}>
                    {icon}
                </div>
                <div className="ml-3">
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
                    <p className={`text-xl font-bold ${textColor}`}>S/ {value}</p>
                </div>
            </div>
        </div>
    );
}

// Componente para la navegación móvil
function MobileNavItem({ icon, label, active = false }) {
    return (
        <a href="#" className="flex flex-col items-center">
            <div className={`p-2 ${active ? 'text-indigo-600' : 'text-gray-500'}`}>
                {icon}
            </div>
            <span className={`text-xs ${active ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>{label}</span>
        </a>
    );
}