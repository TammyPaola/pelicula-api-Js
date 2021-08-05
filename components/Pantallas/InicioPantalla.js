import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  NavigationContainer,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

export const InicioPantalla = ({navigation}) => {
  const [lista, setLista] = useState([]);
  const [pelicula, setPelicula] = useState('');
  const [total, setTotal] = useState(0);
  const [consultado, setConsultado] = useState(false);

  const buscar = peli => {
    setConsultado(true);
    const api_url = `http://www.omdbapi.com/?s=${peli}&apikey=341b3a25`;
    fetch(api_url)
      .then(data => {
        return data.json();
      })
      .then(resultado => {
        console.log(resultado);

        const {Search = []} = resultado;

        setLista(Search);
        setTotal(Search.length);
        console.log(Search);
      });
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detalles', {movie: item})}>
      {item.Poster === 'N/A' ? (
        <Image style={styles.images} source={require('../image/nofound.jpg')} />
      ) : (
        <Image style={styles.images} source={{uri: item.Poster}} />
      )}
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Buscador</Text>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputStyle={{backgroundColor: 'pink', color: 'black'}}
        onChangeText={texto => {
          setPelicula(texto);
          buscar(texto);
        }}
        onClear={() => {
          setPelicula('');
          setConsultado(false);
          setLista([]);
        }}
        value={pelicula}
        placeholder="Busca tu Pelicula"
      />
      <View style={{margin: 10, fontSize: 20}}>
        {consultado ? (
          <Text style={styles.text}>Hay {total} resultados</Text>
        ) : (
          <Text style={styles.texto}>Busca tu Pelicula</Text>
        )}
      </View>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        data={lista}
        numColumns={3}
        keyExtractor={item => item.imdbID}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  images: {
    width: 125,
    height: 250,
    margin: 5,
    borderRadius: 5,
    borderColor: 'pink',
    borderWidth: 2,
  },
  txt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
});
