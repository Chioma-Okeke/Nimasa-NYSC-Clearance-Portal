"use client"

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Building2, Shield, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Logo from '@/components/shared/logo';

// Carousel data
const carouselSlides = [
    {
        id: 1,
        title: "Structured Approval Workflow",
        description: "Streamlined process from Corps Member submission to final administrative approval",
        bgGradient: "from-blue-600 to-blue-800",
        icon: "🔄"
    },
    {
        id: 2,
        title: "Role-Based Access Control",
        description: "Secure access levels for Corps Members, Supervisors, HODs, and Administrators",
        bgGradient: "from-green-600 to-green-800",
        icon: "🔒"
    },
    {
        id: 3,
        title: "Digital Clearance Management",
        description: "Efficient tracking and management of NYSC clearance documentation",
        bgGradient: "from-purple-600 to-purple-800",
        icon: "📋"
    }
];

// Zod validation schema based on PRD requirements
const loginSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    department: z.string().min(1, 'Department is required'),
    role: z.enum(['CORPS_MEMBER', 'SUPERVISOR', 'HOD', 'ADMIN'], {
        required_error: 'Please select your role',
    }),
    password: z.string().optional(),
}).refine((data) => {
    // Password required for employees (non-corps members)
    if (data.role !== 'CORPS_MEMBER' && !data.password) {
        return false;
    }
    return true;
}, {
    message: 'Password is required for employees',
    path: ['password'],
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function NIMASALoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginResponse, setLoginResponse] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: '',
            department: '',
            role: undefined,
            password: '',
        },
    });

    const selectedRole = form.watch('role');
    const isCorpsMember = selectedRole === 'CORPS_MEMBER';

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    };

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setLoginResponse(null);

        // try {
        //     // Simulate API call to POST /api/unified-auth/login
        //     await new Promise(resolve => setTimeout(resolve, 2000));

        //     // Mock response based on PRD specifications
        //     const mockResponse = {
        //         token: isCorpsMember ? 'mock-token-corps' : 'mock-token-employee',
        //         passwordRequired: !isCorpsMember,
        //         newCorpsMember: isCorpsMember,
        //         role: data.role,
        //         message: isCorpsMember ?
        //             'Welcome to NIMASA! Your account has been created.' :
        //             'Login successful'
        //     };

        //     setLoginResponse(mockResponse);
        //     console.log('Login successful:', { ...data, response: mockResponse });

        // } catch (error) {
        //     console.error('Login error:', error);
        //     setLoginResponse({ error: 'Login failed. Please try again.' });
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'CORPS_MEMBER': return 'NYSC Corps Member';
            case 'SUPERVISOR': return 'Supervisor';
            case 'HOD': return 'Head of Department';
            case 'ADMIN': return 'Administrator';
            default: return role;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Panel - Image Carousel */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
                {carouselSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center transition-transform duration-500 ease-in-out transform ${index === currentSlide ? 'translate-x-0' :
                            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                            }`}
                    >
                        <div className="text-center text-white px-12 max-w-md">
                            <div className="text-6xl mb-6">{slide.icon}</div>
                            <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                            <p className="text-xl opacity-90 leading-relaxed">{slide.description}</p>
                        </div>
                    </div>
                ))}

                {/* Carousel Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            aria-label='carousel-control'
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    aria-label='carousel-left-arrow'
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    aria-label='carousel-right-arrow'
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

                <div className="w-full max-w-md">
                    <Card className="border-0 shadow-xl bg-white">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-bold text-center" style={{ color: '#333333' }}>
                                <div className='flex flex-col items-center gap-2'>
                                    <Logo/>
                                    <p> NYSC Clearance System</p>
                                </div>
                            </CardTitle>
                            <CardDescription className="text-center text-gray-600">
                                Access the clearance management platform
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {/* {loginResponse && (
                                <Alert className={`mb-6 ${loginResponse.error ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                                    <AlertDescription className={loginResponse.error ? 'text-red-800' : 'text-green-800'}>
                                        {loginResponse.error || loginResponse.message}
                                    </AlertDescription>
                                </Alert>
                            )} */}

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Field */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel style={{ color: '#333333' }} className="font-medium">
                                                    Full Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your full name"
                                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-600 text-sm" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Department Field */}
                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel style={{ color: '#333333' }} className="font-medium">
                                                    Department
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your department"
                                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-600 text-sm" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Role Selection */}
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel style={{ color: '#333333' }} className="font-medium">
                                                    Role
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                                            <SelectValue placeholder="Select your role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="CORPS_MEMBER">
                                                            <div className="flex items-center space-x-2">
                                                                <Users className="w-4 h-4" style={{ color: '#0066CC' }} />
                                                                <span>NYSC Corps Member</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="SUPERVISOR">
                                                            <div className="flex items-center space-x-2">
                                                                <Shield className="w-4 h-4" style={{ color: '#006633' }} />
                                                                <span>Supervisor</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="HOD">
                                                            <div className="flex items-center space-x-2">
                                                                <Building2 className="w-4 h-4" style={{ color: '#003366' }} />
                                                                <span>Head of Department</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="ADMIN">
                                                            <div className="flex items-center space-x-2">
                                                                <Shield className="w-4 h-4" style={{ color: '#7B1FA2' }} />
                                                                <span>Administrator</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-600 text-sm" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password Field - Conditional */}
                                    {selectedRole && !isCorpsMember && (
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel style={{ color: '#333333' }} className="font-medium">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type={showPassword ? 'text' : 'password'}
                                                                placeholder="Enter your password"
                                                                className="h-11 pr-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                                {...field}
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-600 text-sm" />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {/* Role-specific Information */}
                                    {selectedRole && (
                                        <div className="p-4 rounded-lg bg-[#F5F5F5]">
                                            <p className="text-sm text-[#666666]">
                                                <strong>Selected Role:</strong> {getRoleDisplayName(selectedRole)}
                                            </p>
                                            {isCorpsMember && (
                                                <p className="text-sm mt-1 text-[#006633]">
                                                    New corps members will have accounts created automatically upon login.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-11 font-semibold text-white"
                                        style={{ backgroundColor: '#0066CC' }}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                Signing in...
                                            </div>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </Button>
                                </form>
                            </Form>

                            {/* Footer */}
                            <div className="mt-6 text-center text-sm text-gray-600">
                                <p>
                                    Need technical assistance?{' '}
                                    <Button type="button" variant="link" className="p-0 h-auto text-sm" style={{ color: '#0066CC' }}>
                                        Contact IT Support
                                    </Button>
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    © 2024 NIMASA - All rights reserved
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}