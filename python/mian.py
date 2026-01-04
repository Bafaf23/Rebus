print("================================")
print("Calculadora IMC")
print("================================")

peso = float(input("Ingresa tu peso:"))
altura = float(input("Ingresa tu altura en metros:"))
print("================================")

imc = peso / pow(altura, 2)

if imc <= 18.5:
  print(imc, "Tu IMC es bajo")
elif imc > 18.5 or imc < 24.9:
  print(imc, "Tu IMC es Normal")
elif imc >= 25:
  print(imc, "Estas en Sobrepeso")
elif imc >= 30:
  print(imc, "Estas en obesidad")
else:
  print("Los datos ingresados son errados")

print("================================")