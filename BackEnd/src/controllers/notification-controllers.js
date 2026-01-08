import * as NotificationService from '../services/notification-services.js';

// 1. Create notification
export const createNotification = async (req, res) => {
  try {
    const notification = await NotificationService.createNotificationService(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

// 2. Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { authId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const notifications = await NotificationService.getNotificationsService({authId, page: parseInt(page, 10), limit: parseInt(limit, 10)});
    res.status(200).json({
      status: 'success',
      message: 'Notifications fetched successfully',
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

// 3. Mark single notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await NotificationService.markNotificationAsReadService(req.params);
    res.status(200).json({
      status: 'success',
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

// 4. Mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const result = await NotificationService.markAllNotificationsAsReadService(req.params);
    res.status(200).json({
      status: 'success',
      message: 'All notifications marked as read',
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};
