#!/bin/bash

# Obtener los gobernadores disponibles y enumerarlos con números
available_governors=($(cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_available_governors | sort -u))
echo "Los siguientes métodos de rendimiento están disponibles:"
for i in "${!available_governors[@]}"; do
    echo "$i. ${available_governors[$i]}"
done

echo "El actual es:"
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor | sort -u

# Pedir al usuario que elija un número de la lista
read -p "Selecciona un número de la lista de arriba: " selected_index

# Verificar si la entrada es un número válido
if ! [[ "$selected_index" =~ ^[0-9]+$ ]] || [ "$selected_index" -ge "${#available_governors[@]}" ]; then
    echo "Por favor, ingresa un número válido de la lista."
    exit 1
fi

# Seleccionar el gobernador correspondiente al número ingresado
selected_governor="${available_governors[$selected_index]}"

# Cambiar el gobernador con sudo
echo "$selected_governor" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
