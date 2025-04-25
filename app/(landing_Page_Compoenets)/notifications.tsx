"use client";

import { useEffect, useState } from "react";
import { Axis3DIcon, Bell, Check, Globe } from "lucide-react";
import Pusher from "pusher-js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCookies } from "next-client-cookies";
import AxiosInstance from "@/lib/axiosInstance";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "alert" | "success";
}
const pusher = new Pusher("1589737c361949f5beae", {
  cluster: "eu",
  forceTLS: true,
});
export default function NotificationsMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const cookies = useCookies();
  const userId = cookies.get("id");
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!userId) return;

        const res = await AxiosInstance.get("/notifs", {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: userId,
          },
        });
        if (res.status === 201) {
          console.log(res.data);
          const data = res.data.map((notification: any) => ({
            id: notification._id,
            title: notification.title,
            message: notification.message,
            time: notification.createdAt,
            read: notification.read,
            type: notification.type,
          }));
          setNotifications(data);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
    // Channel: guide-6807a1d7c4852e6ece17f68c, Event: new reservation
    const channel = pusher.subscribe(`guide-${userId}`);

    channel.bind("new reservation", (data: any) => {
      setNotifications((prev) => [...prev, data]);
    });
    channel.bind("subscribtion", (data: any) => {
      setNotifications((prev) => [...prev, data]);
    });
    
  }, [userId]);
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${unit} ago`
          : `${interval} ${unit}s ago`;
      }
    }

    return "just now";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "info":
        return <Globe className="h-4 w-4 text-sky-500" />;
      case "alert":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "success":
        return <Check className="h-4 w-4 text-emerald-500" />;
      default:
        return <Bell className="h-4 w-4 text-sky-500" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-700" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-sky-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-white rounded-md shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-sky-600 hover:text-sky-800"
              >
                Mark all as read
              </Button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-0 flex gap-3 ${
                      notification.read ? "bg-white" : "bg-sky-50"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex flex-row items-center justify-center">
                      {" "}
                      <div className="mt-1">
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-medium text-sm">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-slate-500">
                            {formatTimeAgo(notification.time)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 px-2">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-slate-500">
                No notifications
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-slate-50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-sm text-sky-600 hover:text-sky-800"
            >
              View all notifications
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
