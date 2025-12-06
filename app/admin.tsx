import Constants from 'expo-constants';
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
  View,
} from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { db } from '../FirebaseConfig';
import BackButton from '../components/BackButton';
import { AnimatedHeader, AnimatedText, AnimatedButton, AnimatedCard, AnimatedListItem } from '../components/AnimatedComponents';


// Modern 3D dark theme matching Gadget Garage branding 

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

const ADMIN_PASSWORD = (Constants?.expoConfig?.extra?.EXPO_ADMIN_PASSWORD as string) || process.env.EXPO_ADMIN_PASSWORD || '!'; // Set EXPO_ADMIN_PASSWORD in your environment

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

  const renderItem = (item: any, type: 'appointment' | 'quote', index: number) => (
    <AnimatedListItem
      key={item.id}
      index={index}
    >
      <AnimatedButton
        delay={0}
        onPress={() => {
          setSelectedItem({ ...item, type });
          setModalVisible(true);
        }}
        style={styles.itemCard}
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
      </AnimatedButton>
    </AnimatedListItem>
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
            <AnimatedButton
              delay={0}
              onPress={() => deleteItem(selectedItem?.type + 's', selectedItem?.id)}
              style={[styles.button, styles.deleteButton]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </AnimatedButton>
            <AnimatedButton
              delay={100}
              onPress={() => setModalVisible(false)}
              style={[styles.button, styles.closeButton]}
            >
              <Text style={styles.buttonText}>Close</Text>
            </AnimatedButton>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <AnimatedHeader style={styles.header}>
          <View style={styles.headerContent}>
            <AnimatedText delay={200} style={styles.headerTitle}>Admin</AnimatedText>
            <AnimatedText delay={400} style={styles.headerSubtitle}>Secure access</AnimatedText>
            <Animated.View 
              entering={ZoomIn.delay(600).springify()}
              style={styles.headerDecoration} 
            />
          </View>
        </AnimatedHeader>
        <View style={styles.backButtonContainer}>
          <BackButton 
            variant="floating" 
            color="#ffffff" 
            title=""
          />
        </View>
        <View style={styles.authContainer}>
          <AnimatedCard delay={300} style={styles.authCard}>
            <Text style={styles.title}>Admin Access</Text>
            <Text style={styles.subtitle}>Enter admin password to continue</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Admin Password"
              placeholderTextColor="#666666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={authenticate}
            />
            
            <AnimatedButton delay={500} onPress={authenticate} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </AnimatedButton>
          </AnimatedCard>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AnimatedHeader style={styles.header}>
        <View style={styles.headerContent}>
          <AnimatedText delay={200} style={styles.headerTitle}>Admin Dashboard</AnimatedText>
          <AnimatedText delay={400} style={styles.headerSubtitle}>Gadget Garage - Firestore Data</AnimatedText>
          <Animated.View 
            entering={ZoomIn.delay(600).springify()}
            style={styles.headerDecoration} 
          />
        </View>
      </AnimatedHeader>
      <View style={styles.backButtonContainer}>
        <BackButton 
          variant="floating" 
          color="#1e40af" 
          title=""
        />
      </View>
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Loading data...</Text>
          </View>
        ) : (
          <>
            {/* Statistics */}
            <View style={styles.statsContainer}>
              <AnimatedCard delay={200} style={styles.statCard}>
                <Text style={styles.statNumber}>{data.appointments.length}</Text>
                <Text style={styles.statLabel}>Appointments</Text>
              </AnimatedCard>
              <AnimatedCard delay={300} style={styles.statCard}>
                <Text style={styles.statNumber}>{data.quotes.length}</Text>
                <Text style={styles.statLabel}>Quotes</Text>
              </AnimatedCard>
            </View>

            {/* Appointments */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Appointments</Text>
              {data.appointments.length === 0 ? (
                <Text style={styles.emptyText}>No appointments found</Text>
              ) : (
                data.appointments.map((item, index) => renderItem(item, 'appointment', index))
              )}
            </View>

            {/* Quotes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Quotes</Text>
              {data.quotes.length === 0 ? (
                <Text style={styles.emptyText}>No quotes found</Text>
              ) : (
                data.quotes.map((item, index) => renderItem(item, 'quote', index))
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
    backgroundColor: '#0a0a0a',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0a0a0a',
  },
  header: {
    backgroundColor: '#000000',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  headerDecoration: {
    width: 80,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 58,
    left: 15,
    zIndex: 10,
  },
  authCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    paddingBottom: 15,
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    padding: 18,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#0f0f0f',
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
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
    color: '#a0a0a0',
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 5,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 15,
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  itemCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  itemDate: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  itemInfo: {
    fontSize: 14,
    color: '#b0b0b0',
    marginBottom: 4,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    maxHeight: '80%',
    width: '90%',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 12,
    color: '#b0b0b0',
    lineHeight: 24,
  },
  detailLabel: {
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  closeButton: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default adminPage;