import axios from "axios";

export function handleApiError(error: unknown): string {
    if(axios.isAxiosError(error)) {
        const message = (
            error.response?.data.message || 
            error.response?.data.errro ||
            "Erro na comunicação com o servidor"
        );

        return message;
    }

    return "Erro inesperado. Tente novamente mais tarde.";
}