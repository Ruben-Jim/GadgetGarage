# Admin Panel Setup - Gadget Garage

Your admin panel has been successfully created! Here's how to use it:

## Accessing the Admin Panel

1. **Via Website**: Navigate to `gadgetgarage.app/admin` (once deployed)
2. **Via App**: Look for the small gear icon (⚙️) in the bottom-right corner of the main page
3. **Direct Navigation**: The admin page is at `/admin` route

## Security Features

### Authentication
- Password-protected access
- Default password: `GadgetGarage2024!`
- Configurable via environment variable `EXPO_ADMIN_PASSWORD`

### Security Recommendations
1. **Change the default password immediately**
2. **Use environment variables for production**
3. **The admin access button is deliberately subtle (low opacity)**
4. **Consider implementing session timeouts for added security**

## Features Available

### Dashboard Overview
- Real-time statistics showing total appointments and quotes
- Quick overview cards with key metrics

### Data Management
- **Appointments**: View all customer appointment requests
  - Customer contact information
  - Preferred dates and times
  - Device types and issues
  - Urgency levels
- **Quotes**: View all quote requests
  - Customer details
  - Device information
  - Issue descriptions

### Actions Available
- **View Details**: Tap any item to see full details in a modal
- **Delete Records**: Remove completed or spam entries
- **Refresh Data**: Pull to refresh or manual refresh
- **Export**: (Future feature - contact data export)

## Setting Up Environment Variables

### For Production/Deployment
Create a `.env` file in your project root:

```bash
# Copy from .env.example and fill in your values
EXPO_FIREBASE_API_KEY=your_actual_firebase_api_key
EXPO_ADMIN_PASSWORD=your_secure_admin_password
```

### For Enhanced Security
Consider these additional security measures:

1. **IP Restriction**: Limit admin access to specific IP addresses
2. **Two-Factor Authentication**: Add 2FA for admin access
3. **Session Management**: Implement auto-logout after inactivity
4. **Audit Logging**: Track all admin actions

## Data Structure

The admin panel displays data from these Firestore collections:

### Appointments Collection
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  preferredDate: string,
  preferredTime: string,
  deviceType: string,
  issue: string,
  urgency: string,
  createdAt: timestamp
}
```

### Quotes Collection
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  deviceType: string,
  issue: string,
  urgency: string,
  createdAt: timestamp
}
```

## Usage Tips

1. **Regular Monitoring**: Check the admin panel regularly for new requests
2. **Data Management**: Delete processed/completed entries to keep the list manageable
3. **Customer Contact**: Use the displayed contact information to reach out to customers
4. **Mobile Friendly**: The admin panel works on both desktop and mobile devices

## Troubleshooting

### Cannot Access Admin Panel
1. Check if the password is correct
2. Verify the admin route is properly configured
3. Ensure Firebase connection is working

### No Data Showing
1. Check Firebase/Firestore permissions
2. Verify internet connection
3. Try the refresh function (pull down or manual refresh)

### Performance Issues
1. The app fetches data in real-time from Firestore
2. Large datasets may take longer to load
3. Consider pagination for better performance with many records

---

**Important**: Keep this documentation secure and don't share admin credentials. Regularly update your admin password for security.