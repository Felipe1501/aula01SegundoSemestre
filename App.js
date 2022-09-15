import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Tempo } from './Components/previsao';
import Api from './Components/Api';


export default function App() {
  const [dados, setDados] = useState("");

  const [cidade, setCidade] = useState('São Paulo')
  async function carregaDados(){
    const response = await Api.get(`weather?array_limit=10&fields=only_results,temp,city_name,description,time,wind_speedy,forecast,max,min,date&key=c6186edf&city_name=${cidade},SP`)
    setDados(response.data.forecast);
  
  }

  function limpar(){
    setCidade("");
  } 
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textoTitulo}>PREVISÃO DO TEMPO DATENA</Text>
        <View style={styles.imgs}>
        <Image
      style={styles.imgg}
      source={{
        uri: 'https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2022/05/13/870515956-datena-2-1.jpg',
      }}
      />
      </View>
      </View>
      <View style={styles.blocos}>
        <Text style={styles.texto}>CIDADE:</Text>
        <TextInput
          placeholder='digita sua cidade fi'
          style={styles.input}
          value={cidade}
          onChangeText={(cidade) => setCidade(cidade)}          
        />
      </View>
      <View style={styles.blocos}>
        <TouchableOpacity
        style={styles.btn}
        onPress={carregaDados}
        >
          <Text style={styles.btnTexto}>BUSCAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.btn}
        onPress={limpar}
        >
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.blocos}>
        {/**
         * <Tempo  data={dados}/>
         */}
        <FlatList
          data={dados}
          renderItem={({item}) => {
            return (
              <View style={styles.tempo}>
                <Text>Data: {item.date}</Text>
                <Text>Max: {item.max}</Text>
                <Text>Min: {item.min}</Text>
                <Text>Min: {item.description}</Text>
              </View>
            );
          }}
        
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempo:{
    marginLeft: '10%',
    marginBottom: 10
  },
  textoTitulo: {
    fontSize: 40,
    textAlign: 'center',
    color: '#4281F5',
  },
  imgg:{
    width: 120,
    height: 90,
    margin: 5,
    borderRadius: 20,
  },
  imgs: {
    alignItems: 'center',
  },
  blocos: {
    fontSize: 20,
  },
  texto: {
    color: '#4281F5',
    fontSize: 20,
    marginTop: '4%',
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: 2,
    width: 265,
    height: 35,
    fontSize: 20,
    borderColor: '#4281F5'
  },
  btn: {
    width: 265,
    height: 45,
    backgroundColor: '#4281F5',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  btnTexto: {
    fontSize: 30,
    color: '#FFF'
  }
});
