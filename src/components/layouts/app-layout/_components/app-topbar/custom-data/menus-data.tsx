import { signOut } from "next-auth/react";

export const menuLoginData=[
    {
        label: 'Opciones de usuario',
        items: [
            {
                label: 'Configuración de Usuario',
                icon: 'pi pi-user-edit',
               
            },
            {
                label: 'Cerrar Sesión',
                icon: 'pi pi-sign-out',
                command: () => {signOut()}
            }
        ]
    }
];