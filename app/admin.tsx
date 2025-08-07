import { StatusBar } from 'expo-status-bar';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../FirebaseConfig';


// Will fix to fit the theme in the upcoming days 

interface AdminData {
  appointments: any[];
  quotes: any[];
}

interface AppointmentData {
  id: string;
  name: string;
  address: string;
  service: string;
  date: string;
  time: string;
  status: string;
  createdAt: any;
}

interface QuoteData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deviceType: string;
  issue: string;
  urgency: string;
  createdAt: any;
}

const ADMIN_PASSWORD = process.env.EXPO_ADMIN_PASSWORD || '!'; // Set EXPO_ADMIN_PASSWORD in your environment

const adminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<AdminData>({ appointments: [], quotes: [] });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const authenticate = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      fetchData();
    } else {
      Alert.alert('Error', 'Invalid admin password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch appointments
      const appointmentsQuery = query(
        collection(db, 'appointments'),
        orderBy('createdAt', 'desc')
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointments = appointmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch quotes
      const quotesQuery = query(
        collection(db, 'quotes'),
        orderBy('createdAt', 'desc')
      );
      const quotesSnapshot = await getDocs(quotesQuery);
      const quotes = quotesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setData({ appointments, quotes });
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data from Firestore');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No date';
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const deleteItem = async (collection: string, id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, collection, id));
              fetchData(); // Refresh data
              setModalVisible(false);
              Alert.alert('Success', 'Item deleted successfully');
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          }
        }
      ]
    );
  };

  const renderItem = (item: any, type: 'appointment' | 'quote') => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemCard}
      onPress={() => {
        setSelectedItem({ ...item, type });
        setModalVisible(true);
      }}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>
          {type === 'appointment' ? item.name : `${item.firstName} ${item.lastName}`}
        </Text>
        <Text style={styles.itemDate}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
      {type === 'appointment' ? (
        <>
          <Text style={styles.itemInfo}>Address: {item.address}</Text>
          <Text style={styles.itemInfo}>Service: {item.service}</Text>
          <Text style={styles.itemInfo}>Date: {item.date}</Text>
          <Text style={styles.itemInfo}>Time: {item.time}</Text>
          <Text style={styles.itemInfo}>Status: {item.status}</Text>
        </>
      ) : (
        <>
          <Text style={styles.itemInfo}>Email: {item.email}</Text>
          <Text style={styles.itemInfo}>Phone: {item.phone}</Text>
          <Text style={styles.itemInfo}>Device: {item.deviceType}</Text>
          <Text style={styles.itemInfo}>Issue: {item.issue}</Text>
          <Text style={styles.itemInfo}>Urgency: {item.urgency}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  const renderDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>
              {selectedItem?.type === 'appointment' ? 'Appointment' : 'Quote'} Details
            </Text>
            
            {selectedItem && (
              <>
                {selectedItem.type === 'appointment' ? (
                  <>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Name: </Text>
                      {selectedItem.name}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Address: </Text>
                      {selectedItem.address}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Service: </Text>
                      {selectedItem.service}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Date: </Text>
                      {selectedItem.date}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Time: </Text>
                      {selectedItem.time}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Status: </Text>
                      {selectedItem.status}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Name: </Text>
                      {selectedItem.firstName} {selectedItem.lastName}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Email: </Text>
                      {selectedItem.email}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Phone: </Text>
                      {selectedItem.phone}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Device: </Text>
                      {selectedItem.deviceType}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Issue: </Text>
                      {selectedItem.issue}
                    </Text>
                    <Text style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Urgency: </Text>
                      {selectedItem.urgency}
                    </Text>
                  </>
                )}
                <Text style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Created: </Text>
                  {formatDate(selectedItem.createdAt)}
                </Text>
              </>
            )}
          </ScrollView>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => deleteItem(selectedItem?.type + 's', selectedItem?.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        {/* <BackButton 
      // variant = default, minimal, floating
          variant="floating" 
          color="#7c3aed" 
          title=""
        /> */}
        <View style={styles.authContainer}>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>Enter admin password to continue</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Admin Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={authenticate}
          />
          
          <TouchableOpacity style={styles.loginButton} onPress={authenticate}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* <BackButton 
      // variant = default, minimal, floating
          variant="floating" 
          color="#7c3aed" 
          title=""
        /> */}
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Gadget Garage - Firestore Data</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading data...</Text>
          </View>
        ) : (
          <>
            {/* Statistics */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{data.appointments.length}</Text>
                <Text style={styles.statLabel}>Appointments</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{data.quotes.length}</Text>
                <Text style={styles.statLabel}>Quotes</Text>
              </View>
            </View>

            {/* Appointments */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Appointments</Text>
              {data.appointments.length === 0 ? (
                <Text style={styles.emptyText}>No appointments found</Text>
              ) : (
                data.appointments.map(item => renderItem(item, 'appointment'))
              )}
            </View>

            {/* Quotes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Quotes</Text>
              {data.quotes.length === 0 ? (
                <Text style={styles.emptyText}>No quotes found</Text>
              ) : (
                data.quotes.map(item => renderItem(item, 'quote'))
              )}
            </View>
          </>
        )}
      </ScrollView>

      {renderDetailModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 300,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 300,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  itemDate: {
    fontSize: 12,
    color: '#64748b',
  },
  itemInfo: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#475569',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  closeButton: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default adminPage;