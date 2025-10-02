import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, Lock } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const loginSchema = z.object({
  username: z.string().min(3, 'Usuario debe tener al menos 3 caracteres').max(50),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres').max(100),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [showRecoverModal, setShowRecoverModal] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="Ingrese su usuario"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      type="password"
                      placeholder="Ingrese su contraseña"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto"
              onClick={() => setShowRecoverModal(true)}
            >
              Recuperar / Cambiar clave
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </Form>

      <Dialog open={showRecoverModal} onOpenChange={setShowRecoverModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recuperar / Cambiar Contraseña</DialogTitle>
            <DialogDescription>
              Ingrese su correo electrónico para recibir instrucciones de recuperación.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="correo@ejemplo.com" type="email" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRecoverModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowRecoverModal(false)}>
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
