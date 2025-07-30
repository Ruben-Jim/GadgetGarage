import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { db } from '../app/firebase'; // Adjust the path as necessary

     const QuoteForm = () => {
       const [name, setName] = useState('');
       const [email, setEmail] = useState('');
       const [phone, setPhone] = useState('');
       const [serviceType, setServiceType] = useState('');
       const [description, setDescription] = useState('');
       const [urgency, setUrgency] = useState('');

       const handleSubmit = () => {
         const newQuote = {
           name,
           email,
           phone,
           serviceType,
           description,
           urgency,
           timestamp: serverTimestamp()
         };

         db().collection('quotes').add(newQuote)
           .then(() => console.log('Quote added successfully'))
           .catch((error) => console.error('Error adding quote:', error));
       };

       return (
         <View style={styles.container}>
           <TextInput
             placeholder="Name"
             value={name}
             onChangeText={setName}
             style={styles.input}
           />
           <TextInput
             placeholder="Email"
             value={email}
             onChangeText={setEmail}
             style={styles.input}
           />
           <TextInput
             placeholder="Phone"
             value={phone}
             onChangeText={setPhone}
             style={styles.input}
           />
           <TextInput
             placeholder="Service Type"
             value={serviceType}
             onChangeText={setServiceType}
             style={styles.input}
           />
           <TextInput
             placeholder="Description"
             value={description}
             onChangeText={setDescription}
             style={styles.input}
           />
           <TextInput
             placeholder="Urgency (e.g., High, Medium, Low)"
             value={urgency}
             onChangeText={setUrgency}
             style={styles.input}
           />
           <Button title="Submit Quote" onPress={handleSubmit} />
         </View>
       );
     };

     const styles = StyleSheet.create({
       container: {
         padding: 20,
       },
       input: {
         height: 40,
         borderColor: 'gray',
         borderWidth: 1,
         marginBottom: 10,
         paddingHorizontal: 10,
       },
     });

     export default QuoteForm;