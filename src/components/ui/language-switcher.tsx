import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-white/10 hover:bg-white/20 border border-transparent hover:border-white/20">
                    <Globe className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => changeLanguage('en')} className="font-medium">
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ta')} className="font-medium font-tamil">
                    தமிழ்
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('hi')} className="font-medium font-devanagari">
                    हिन्दी
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
