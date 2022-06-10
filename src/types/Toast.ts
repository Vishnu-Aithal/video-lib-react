export interface Toast {
    _id: string;
    title: string;
    description: string;
    type: "success" | "warning" | "error";
    dateTime: string;
}

export type ToastTypes = "success" | "warning" | "error";
