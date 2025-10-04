"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useRouter } from '@bprogress/next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Page() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentDate(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleProceedToLogin = () => {
    router.push('/login');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="max-w-2xl w-full">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Digital Clock */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-secondary mr-2" />
                <h2 className="text-lg font-medium text-gray-700">Current Time</h2>
              </div>
              <div className="text-5xl font-mono font-bold text-gray-900 mb-2 tracking-wider">
                {formatTime(currentTime)}
              </div>
            </div>

            {/* Date Display */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-secondary mr-2" />
                <h2 className="text-lg font-medium text-gray-700">Today's Date</h2>
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {formatDate(currentDate)}
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Clearance System
              </h1>
              <p className="text-lg text-gray-600">
                Ready to access your clearance dashboard?
              </p>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleProceedToLogin}
              className="bg-secondary/80 hover:bg-secondary text-white font-medium py-4 px-8 shadow-lg hover:shadow-xl hover:scale-105 group text-lg"
            >
              Proceed to Login
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-sm text-gray-500 mt-6">
              Secure access for authorized personnel only
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};