"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
    href?: string;
    label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, label = "Back" }) => {
    const router = useRouter();

    const handleBack = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleBack}
            className="group flex items-center gap-2 pl-0 hover:bg-transparent hover:text-primary transition-colors"
        >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{label}</span>
        </Button>
    );
};

export default BackButton;
