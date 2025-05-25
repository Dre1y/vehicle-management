import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CarFront, Bike } from "lucide-react";
import { Rocket } from "lucide-react";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl text-white font-extrabold">
              <Rocket className="inline-block w-8 h-8 mr-2" />
              Gerenciador de Veículos
            </CardTitle>
            <p className="text-sm text-zinc-400">
              Escolha abaixo o tipo de veículo que você deseja gerenciar.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="outline"
                className="w-full flex-items-center text-white bg-zinc-700 hover:bg-zinc-600 transition-colors"
                onClick={() => navigate("/cars")}
              >
                <CarFront className="w-5 h-5 text-white" />
                Acessar Carros
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="outline"
                className="w-full flex-items-center text-white bg-zinc-700 hover:bg-zinc-600 transition-colors"
                onClick={() => navigate("/motorcycles")}
              >
                <Bike className="w-5 h-5 text-white" />
                Acessar Motos
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default App;
