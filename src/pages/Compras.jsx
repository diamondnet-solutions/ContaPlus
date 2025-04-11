import { useState, useEffect } from "react";
import { Search, Plus, FileText, BarChart2, Grid, List, Calendar, Settings, AlertCircle, ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";

export default function PurchaseManagementDashboard() {
    const [viewType, setViewType] = useState("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [purchases, setPurchases] = useState([
        {
            id: 1,
            date: "2/01/2025",
            documentType: "Factura",
            series: "F600",
            number: "1924481",
            commercialName: "ANDINO",
            ruc: "20537925682",
            businessName: "ANDINO SAC",
            totalPrice: 191.22,
            netValue: 162.05,
            igv: 29.17,
            perception: 3.82
        },
        {
            id: 2,
            date: "3/01/2025",
            documentType: "Factura",
            series: "F600",
            number: "1924948",
            commercialName: "ANDINO",
            ruc: "20537925682",
            businessName: "ANDINO SAC",
            totalPrice: 178.16,
            netValue: 150.98,
            igv: 27.18,
            perception: 3.56
        },
        {
            id: 3,
            date: "3/01/2025",
            documentType: "Factura",
            series: "F001",
            number: "248230",
            commercialName: "DIGOSAC",
            ruc: "20528935507",
            businessName: "DISTRIBUIDORA DE GOLOSINAS Y ALIMENTOS SAC",
            totalPrice: 147.02,
            netValue: 124.59,
            igv: 22.43,
            perception: 2.94
        },
        {
            id: 4,
            date: "3/01/2025",
            documentType: "Factura",
            series: "F001",
            number: "247339",
            commercialName: "DON JOSE",
            ruc: "20107057922",
            businessName: "DON JOSE REPRESENTACIONES E.I.R.L",
            totalPrice: 113.13,
            netValue: 95.87,
            igv: 17.26,
            perception: 2.26
        },
        {
            id: 5,
            date: "7/01/2025",
            documentType: "Boleta",
            series: "B001",
            number: "90734",
            commercialName: "VILCA",
            ruc: "20667657922",
            businessName: "VILCA DISTRIBUCIONES SAC",
            totalPrice: 101.78,
            netValue: 86.43,
            igv: 15.45,
            perception: 0.00
        }
    ]);

    const [formData, setFormData] = useState({
        date: "",
        documentType: "Factura",
        series: "",
        number: "",
        commercialName: "",
        ruc: "",
        businessName: "",
        totalPrice: 0,
        netValue: 0,
        igv: 0,
        perception: 0
    });

    useEffect(() => {
        if (selectedPurchase) {
            setFormData(selectedPurchase);
        } else {
            setFormData({
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/'),
                documentType: "Factura",
                series: "",
                number: "",
                commercialName: "",
                ruc: "",
                businessName: "",
                totalPrice: 0,
                netValue: 0,
                igv: 0,
                perception: 0
            });
        }
    }, [selectedPurchase]);

    const filteredPurchases = purchases.filter(purchase =>
        purchase.commercialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.ruc.includes(searchTerm) ||
        purchase.number.includes(searchTerm)
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "netValue") {
            const netValue = parseFloat(value) || 0;
            const igv = netValue * 0.18;
            const totalPrice = netValue + igv;

            setFormData({
                ...formData,
                netValue,
                igv,
                totalPrice
            });
        } else if (name === "totalPrice") {
            const totalPrice = parseFloat(value) || 0;
            const netValue = totalPrice / 1.18;
            const igv = totalPrice - netValue;

            setFormData({
                ...formData,
                totalPrice,
                netValue,
                igv
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedPurchase) {
            // Update existing purchase
            updatePurchase(formData);
        } else {
            // Add new purchase
            addPurchase(formData);
        }

        setShowModal(false);
    };

    const addPurchase = (purchase) => {
        setPurchases([...purchases, { ...purchase, id: purchases.length + 1 }]);
    };

    const updatePurchase = (purchase) => {
        setPurchases(purchases.map(p => p.id === purchase.id ? purchase : p));
    };

    const deletePurchase = (id) => {
        setPurchases(purchases.filter(p => p.id !== id));
    };

    const openEditModal = (purchase) => {
        setSelectedPurchase(purchase);
        setShowModal(true);
    };

    const openNewModal = () => {
        setSelectedPurchase(null);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-600 rounded-md"></div>
                            <span className="ml-2 text-xl font-semibold text-gray-800">Smart<span className="text-purple-600">Market</span></span>
                        </div>
                        <nav className="hidden md:flex space-x-6">
                            <button className="px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">Compra</button>
                            <button className="px-3 py-2 text-gray-600 hover:text-purple-600">Órdenes</button>
                            <button className="px-3 py-2 text-gray-600 hover:text-purple-600">Productos</button>
                            <button className="px-3 py-2 text-gray-600 hover:text-purple-600">Reportes</button>
                            <button className="px-3 py-2 text-gray-600 hover:text-purple-600">Configuración</button>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2">
                            <AlertCircle className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">1</span>
                        </button>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">E</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="px-6 py-4">
                    <div className="flex flex-col space-y-4">
                        {/* Page Title and Actions */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-2 bg-purple-600 text-white rounded-md shadow-sm font-medium flex items-center" onClick={openNewModal}>
                                    <Plus className="w-4 h-4 mr-1" />
                                    Nuevo
                                </button>
                                <h1 className="text-lg font-semibold text-gray-800">Compras Enero 2025</h1>
                                <button className="p-1 text-gray-500 hover:text-purple-600">
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" />
                                </div>
                                <div className="flex border border-gray-300 rounded-md">
                                    <button
                                        className={`p-2 ${viewType === 'table' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                        onClick={() => setViewType('table')}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        className={`p-2 ${viewType === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                        onClick={() => setViewType('list')}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button
                                        className={`p-2 ${viewType === 'kanban' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                        onClick={() => setViewType('kanban')}
                                    >
                                        <BarChart2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        className={`p-2 ${viewType === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                        onClick={() => setViewType('calendar')}
                                    >
                                        <Calendar className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table View */}
                        {viewType === 'table' && (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nro</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serie</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUC</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Social</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Venta</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Venta</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IGV</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percep.</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredPurchases.map((purchase) => (
                                            <tr key={purchase.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.documentType}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.series}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.commercialName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.ruc}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.businessName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">S/ {purchase.totalPrice.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">S/ {purchase.netValue.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">S/ {purchase.igv.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">S/ {purchase.perception.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openEditModal(purchase)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                                    <button onClick={() => deletePurchase(purchase.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            Anterior
                                        </button>
                                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            Siguiente
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredPurchases.length}</span> de{' '}
                                                <span className="font-medium">{purchases.length}</span> compras
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    1
                                                </button>
                                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* List View */}
                        {viewType === 'list' && (
                            <div className="bg-white rounded-lg shadow">
                                <ul className="divide-y divide-gray-200">
                                    {filteredPurchases.map((purchase) => (
                                        <li key={purchase.id} className="px-6 py-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                        <FileText className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{purchase.businessName}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {purchase.documentType} {purchase.series}-{purchase.number} | {purchase.date}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium text-gray-900">S/ {purchase.totalPrice.toFixed(2)}</div>
                                                        <div className="text-xs text-gray-500">IGV: S/ {purchase.igv.toFixed(2)}</div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => openEditModal(purchase)} className="p-1 text-blue-600 hover:text-blue-800">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => deletePurchase(purchase.id)} className="p-1 text-red-600 hover:text-red-800">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Kanban View */}
                        {viewType === 'kanban' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                                        <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Pendiente de pago
                                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{filteredPurchases.filter(p => p.id % 3 === 0).length}</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {filteredPurchases.filter(p => p.id % 3 === 0).map((purchase) => (
                                            <div key={purchase.id} className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-sm font-medium text-gray-900">{purchase.commercialName}</div>
                                                    <div className="flex space-x-1">
                                                        <button onClick={() => openEditModal(purchase)} className="text-blue-600 hover:text-blue-800">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">{purchase.series}-{purchase.number}</div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <div className="text-sm font-semibold text-gray-800">S/ {purchase.totalPrice.toFixed(2)}</div>
                                                    <div className="text-xs text-gray-500">{purchase.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                                        <span className="h-2 w-2 bg-blue-400 rounded-full mr-2"></span>
                                        En proceso
                                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{filteredPurchases.filter(p => p.id % 3 === 1).length}</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {filteredPurchases.filter(p => p.id % 3 === 1).map((purchase) => (
                                            <div key={purchase.id} className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-sm font-medium text-gray-900">{purchase.commercialName}</div>
                                                    <div className="flex space-x-1">
                                                        <button onClick={() => openEditModal(purchase)} className="text-blue-600 hover:text-blue-800">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">{purchase.series}-{purchase.number}</div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <div className="text-sm font-semibold text-gray-800">S/ {purchase.totalPrice.toFixed(2)}</div>
                                                    <div className="text-xs text-gray-500">{purchase.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                                        <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                                        Completado
                                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{filteredPurchases.filter(p => p.id % 3 === 2).length}</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {filteredPurchases.filter(p => p.id % 3 === 2).map((purchase) => (
                                            <div key={purchase.id} className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-sm font-medium text-gray-900">{purchase.commercialName}</div>
                                                    <div className="flex space-x-1">
                                                        <button onClick={() => openEditModal(purchase)} className="text-blue-600 hover:text-blue-800">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">{purchase.series}-{purchase.number}</div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <div className="text-sm font-semibold text-gray-800">S/ {purchase.totalPrice.toFixed(2)}</div>
                                                    <div className="text-xs text-gray-500">{purchase.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Calendar View */}
                        {viewType === 'calendar' && (
                            <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-gray-900">Enero 2025</h3>
                                    <div className="flex space-x-2">
                                        <button className="p-1 rounded hover:bg-gray-100">
                                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100">
                                            <ChevronRight className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
                                    <div className="py-1">Lun</div>
                                    <div className="py-1">Mar</div>
                                    <div className="py-1">Mié</div>
                                    <div className="py-1">Jue</div>
                                    <div className="py-1">Vie</div>
                                    <div className="py-1">Sáb</div>
                                    <div className="py-1">Dom</div>
                                    <div className="py-1">Dom</div>
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                    {/* Calendar days */}
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                                        const purchases_on_day = filteredPurchases.filter(p => {
                                            const [d, m, y] = p.date.split('/');
                                            return parseInt(d) === day && m === '01';
                                        });

                                        return (
                                            <div key={day} className={`border rounded-md p-1 min-h-[80px] ${day === 1 ? 'col-start-3' : ''}`}>
                                                <div className="flex justify-between items-center">
                          <span className={`text-xs font-medium ${day === new Date().getDate() ? 'bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center' : 'text-gray-700'}`}>
                            {day}
                          </span>
                                                    {purchases_on_day.length > 0 && (
                                                        <span className="bg-purple-100 text-purple-800 text-xs rounded-full px-1.5">
                              {purchases_on_day.length}
                            </span>
                                                    )}
                                                </div>
                                                {purchases_on_day.length > 0 && (
                                                    <div className="mt-1 space-y-1">
                                                        {purchases_on_day.slice(0, 2).map((purchase) => (
                                                            <div
                                                                key={purchase.id}
                                                                className="bg-blue-50 border border-blue-100 text-blue-700 text-xs p-1 rounded truncate cursor-pointer hover:bg-blue-100"
                                                                onClick={() => openEditModal(purchase)}
                                                            >
                                                                {purchase.commercialName} - S/{purchase.totalPrice.toFixed(2)}
                                                            </div>
                                                        ))}
                                                        {purchases_on_day.length > 2 && (
                                                            <div className="text-xs text-gray-500 pl-1">+ {purchases_on_day.length - 2} más</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Modal for adding/editing purchase */}
                        {showModal && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {selectedPurchase ? 'Editar Compra' : 'Nueva Compra'}
                                            </h3>
                                            <button
                                                onClick={() => setShowModal(false)}
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="px-6 py-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                                <input
                                                    type="text"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="DD/MM/YYYY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
                                                <select
                                                    name="documentType"
                                                    value={formData.documentType}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                >
                                                    <option value="Factura">Factura</option>
                                                    <option value="Boleta">Boleta</option>
                                                    <option value="Nota de Crédito">Nota de Crédito</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Serie</label>
                                                <input
                                                    type="text"
                                                    name="series"
                                                    value={formData.series}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="F001"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    value={formData.number}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="00000001"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial</label>
                                                <input
                                                    type="text"
                                                    name="commercialName"
                                                    value={formData.commercialName}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="Nombre comercial"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">RUC</label>
                                                <input
                                                    type="text"
                                                    name="ruc"
                                                    value={formData.ruc}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="20XXXXXXXXX"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social</label>
                                                <input
                                                    type="text"
                                                    name="businessName"
                                                    value={formData.businessName}
                                                    onChange={handleInputChange}
                                                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="Razón social completa"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Compras Gravadas (Precio Venta)</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">S/</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        name="totalPrice"
                                                        value={formData.totalPrice}
                                                        onChange={handleInputChange}
                                                        className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Valor Venta (Neto)</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">S/</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        name="netValue"
                                                        value={formData.netValue}
                                                        onChange={handleInputChange}
                                                        className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">IGV (18%)</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">S/</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        name="igv"
                                                        value={formData.igv}
                                                        onChange={handleInputChange}
                                                        className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                                        placeholder="0.00"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Percepción</label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">S/</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        name="perception"
                                                        value={formData.perception}
                                                        onChange={handleInputChange}
                                                        className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-3 bg-gray-50 flex items-center justify-end space-x-3 rounded-b-lg">
                                            <button
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                                className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            >
                                                {selectedPurchase ? 'Actualizar' : 'Guardar'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer stats */}
            <footer className="bg-white border-t border-gray-200">
                <div className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-gray-600">Total: <span className="font-medium text-gray-900">S/ {filteredPurchases.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)}</span></span>
                        </div>
                        <div className="flex items-center">
                            <FileText className="w-4 h-4 text-blue-500 mr-1" />
                            <span className="text-gray-600">Registros: <span className="font-medium text-gray-900">{filteredPurchases.length}</span></span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-gray-600">Última actualización: <span className="font-medium text-gray-900">11/04/2025</span></span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        Smart<span className="text-purple-600">Market</span> v1.0
                    </div>
                </div>
            </footer>
        </div>
    );
}