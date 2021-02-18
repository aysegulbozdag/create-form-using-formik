import React from 'react';
import {Formik} from 'formik';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import * as Yup from 'yup';

const reviewSchema = () =>
  //Hata mesajı verilmesini sağlar.
  Yup.object().shape({
    title: Yup.string().required('Kullanıcı ismi girin!'),
    body: Yup.string().required().min(8),
    rating: Yup.string()
      .required()
      .test('is-num-15', 'Raiting must be a number 1 - 5', (val) => {
        return parseInt(val) < 6 && parseInt(val) > 0;
      }),
  });
function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center', margin: 20}}>
      <Formik
        initialValues={{title: '', body: '', rating: ''}}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm(); // formun temizlenmesini sağlar.
        }}>
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Review title"
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />
            <Text>{props.touched.title && props.errors.title}</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Review body"
              onChangeText={props.handleChange('body')}
              value={props.values.body}
            />
            <Text>{props.touched.body && props.errors.body}</Text>

            <TextInput
              style={styles.input}
              placeholder="Review ( 1 - 5 )"
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType="numeric"
            />
            <Text>{props.touched.rating && props.errors.rating}</Text>

            <Button
              title="submit"
              color="maroon"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default App;
