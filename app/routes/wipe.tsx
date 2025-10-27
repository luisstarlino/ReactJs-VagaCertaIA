/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-09 22:10
* @Updated: 2025-10-27 (Refactored for a better UI/UX)
*****************************************************************************************/
import { usePuterStore } from "lib/puter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar"; // Assuming you want a consistent header

// Interface for a simpler file view
interface FileDisplay {
    id: string;
    name: string;
    path: string;
    size: number | null;
}

export function meta() {
    return [
        { title: "Vaga Certa - Gerenciamento de Dados" },
        { name: "description", content: "Gerencie e limpe os dados do seu aplicativo." },
    ];
}

const WipeApp = () => {

    // Destructuring with a focus on necessary tools and state
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();

    // State for files and loading/action status
    const [files, setFiles] = useState<FileDisplay[]>([]);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [isWiping, setIsWiping] = useState(false);
    const [wipeComplete, setWipeComplete] = useState(false);

    // Function to load the files from the file system (FS)
    const loadFiles = async () => {
        setLoadingFiles(true);
        try {
            const fsItems = (await fs.readDir("./")) as FSItem[];
            // Only list relevant info for display
            const displayedFiles: FileDisplay[] = fsItems.map(file => ({
                id: file.id,
                name: file.name,
                path: file.path,
                size: file.size,
            }));
            setFiles(displayedFiles);
        } catch (err) {
            console.error("Failed to load files:", err);
            // Handle error state if necessary
        } finally {
            setLoadingFiles(false);
        }
    };

    // Redirect unauthenticated users
    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
        // Load files immediately on authenticated mount
        if (auth.isAuthenticated) {
            loadFiles();
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    // Handle the deletion process for all app data
    const handleDelete = async () => {
        if (!window.confirm("ATENÇÃO: Você tem certeza que deseja APAGAR TODOS os seus currículos e dados do aplicativo? Esta ação é irreversível.")) {
            return;
        }

        setIsWiping(true);
        setWipeComplete(false); // Reset complete state

        try {
            // 1. Delete all files from the File System (FS)
            const deleteFilePromises = files.map((file) => fs.delete(file.path));
            await Promise.all(deleteFilePromises);

            // 2. Clear all data from the Key-Value (KV) store
            await kv.flush();

            // 3. Update the UI
            setFiles([]); // Clear the list immediately
            setWipeComplete(true);

        } catch (err) {
            console.error("Failed to wipe app data:", err);
            // In a real app, show a user-friendly error notification
        } finally {
            setIsWiping(false);
            // Re-fetch (though should be empty)
            loadFiles();
        }
    };

    // Display for loading and error states
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-xl font-semibold">Carregando dados...</p>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800 p-8">
            <h1 className="text-2xl font-bold mb-4">Erro de Conexão</h1>
            <p>Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.</p>
            <p className="text-sm mt-2">Detalhe: {error}</p>
        </div>;
    }

    // Main component return
    return (
        <main className={"bg-[url('/images/new-bg-main.svg')] bg-cover min-h-screen pb-10"}>

            {/* Navbar - Keep consistent with Home */}
            <Navbar name={auth.getUser()?.username} />

            <section className={"main-section px-4 sm:px-6 lg:px-8"}>

                {/* TITLE & BREADCRUMB */}
                <div className={""}>
                    <h1 className="text-4xl font-extrabold text-white mb-2">Gerenciamento de Dados</h1>
                    <p className="text-lg text-black text-center">Área para visualizar e apagar permanentemente todos os seus dados.</p>
                </div>

                {/* --- */}

                {/* DATA SUMMARY / FILES LIST */}
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-6 mb-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Seus Arquivos Salvos</h2>



                    {loadingFiles ? (
                        <div className="flex justify-center py-8">
                            <img src="/images/resume-scan-2.gif" alt="Carregando" className="w-[100px]" />
                        </div>
                    ) : files.length === 0 ? (
                        <div className="p-4 py-5 bg-green-50 border border-green-200 rounded-md text-green-700">
                            <p className="font-semibold">Nenhum arquivo encontrado.</p>
                            {wipeComplete && <p className="mt-1 text-sm">A limpeza de dados foi concluída com sucesso!</p>}
                        </div>
                    ) : (
                        <div className="max-h-64 mt-4 overflow-y-auto border rounded-lg p-3">
                            <ul className="divide-y divide-gray-200">
                                {files.map((file) => (
                                    <li key={file.id} className="py-2 flex justify-between items-center text-gray-700 text-sm">
                                        <span className="font-medium truncate pr-4">{file.name}</span>
                                        <span className="text-xs text-gray-500">
                                            {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Tamanho Desconhecido'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm font-semibold mt-3 text-gray-600">Total de arquivos: {files.length}</p>
                        </div>
                    )}

                    {files.length > 0 && ( /* WIPE DATA SECTION (The dangerous part) */
                        <div className="bg-red-50 border-2 mt-5 border-red-300 shadow-2xl rounded-lg p-8 max-w-4xl mx-auto text-center">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <h2 className="text-3xl font-bold text-red-700 mb-3">Limpeza de Dados do Aplicativo</h2>
                            <p className="text-red-600 mb-6 max-w-lg mx-auto">
                                <strong>Esta é uma ação PERMANENTE e IRREVERSÍVEL.</strong><br />Ao clicar no botão abaixo, todos os seus currículos (Arquivos) e dados de avaliação serão apagados.
                            </p>

                            <button className={`font-extrabold py-3 px-8 rounded-lg shadow-lg transition duration-300 
                            ${(files.length === 0 || isWiping)
                                    ? 'bg-red-200 text-red-400 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                }`}
                                onClick={handleDelete}
                                disabled={files.length === 0 || isWiping}
                            >
                                {isWiping ? (
                                    'Apagando Dados...'
                                ) : files.length === 0 ? (
                                    'Sem dados para Apagar'
                                ) : (
                                    `Apagar Permanentemente Todos os Dados (${files.length} itens)`
                                )}
                            </button>

                            {isWiping && (
                                <p className="mt-4 text-red-500">Aguarde, a operação pode levar alguns segundos...</p>
                            )}
                        </div>
                    )}



                </div>

                {/* --- */}



            </section>

        </main>
    );
};

export default WipeApp;