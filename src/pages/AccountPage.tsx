import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Define the schema for the profile form
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Mock data for purchase history
const purchaseHistory = [
    { id: 1, title: "The Great Gatsby", date: "2023-10-15", price: "$12.99" },
    { id: 2, title: "1984", date: "2023-09-01", price: "$9.99" },
    { id: 3, title: "Moby Dick", date: "2023-08-22", price: "$14.50" },
];


const AccountPage = () => {
    console.log('AccountPage loaded');

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "Alex Doe",
            email: "alex.doe@example.com",
        },
    });

    function onSubmit(data: z.infer<typeof profileFormSchema>) {
        console.log("Profile updated:", data);
        // In a real app, you would send this to your backend.
    }
    
    const handleLogout = () => {
        console.log("User logged out.");
        // In a real app, this would clear auth tokens and redirect to the login page.
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container mx-auto py-8 px-4">
                <h1 className="text-4xl font-heading mb-8 text-foreground">My Account</h1>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 max-w-2xl">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="history">Purchase History</TabsTrigger>
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-heading">Profile Information</CardTitle>
                                <CardDescription className="font-body">
                                    Update your personal details here.
                                </CardDescription>
                            </CardHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your Name" {...field} className="font-body"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="your@email.com" {...field} className="font-body" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit">Save Changes</Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="history" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-heading">Purchase History</CardTitle>
                                <CardDescription className="font-body">A record of your purchased books.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {purchaseHistory.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center font-body">
                                            <div>
                                                <p className="font-medium text-foreground">{item.title}</p>
                                                <p className="text-sm text-muted-foreground">Purchased on {item.date}</p>
                                            </div>
                                            <p className="font-semibold text-foreground">{item.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payment" className="mt-6">
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-heading">Payment Methods</CardTitle>
                                <CardDescription className="font-body">Manage your saved payment methods.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-md">
                                    <div className='font-body'>
                                        <p className="font-medium">Visa **** 1234</p>
                                        <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                                    </div>
                                    <Button variant="secondary">Remove</Button>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Add New Card</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="mt-6">
                         <Card>
                             <CardHeader>
                                <CardTitle className="font-heading">Security &amp; Login</CardTitle>
                                <CardDescription className="font-body">Manage your password and session.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="outline">Change Password</Button>
                                <Separator />
                                <div className="flex flex-col space-y-2">
                                    <p className="font-medium font-body text-foreground">Log Out</p>
                                    <p className="text-sm text-muted-foreground font-body">
                                        This will log you out of your account on this device.
                                    </p>
                                    <Button variant="destructive" className="w-fit" onClick={handleLogout}>Log Out</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

export default AccountPage;