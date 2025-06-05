import type { User } from '../types';

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        type: 'human',
        isOnline: true,
    },
    {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://www.google.com/imgres?q=%D0%BD%D0%B0%D0%B7%D0%B0%D1%80%D0%B1%D0%B0%D0%B5%D0%B2&imgurl=http%3A%2F%2Frussian.news.cn%2F134568759_14408974712341n.jpg&imgrefurl=http%3A%2F%2Frussian.news.cn%2F2015-08%2F30%2Fc_134568759.htm&docid=TvG39B1eh4Fi2M&tbnid=wtgu-qxdUpYT6M&vet=12ahUKEwi45Mv09teNAxVJIRAIHXtgAKQQM3oECDYQAA..i&w=642&h=900&hcb=2&ved=2ahUKEwi45Mv09teNAxVJIRAIHXtgAKQQM3oECDYQAA',
        type: 'human',
        isOnline: false,
    },
    {
        id: '3',
        name: 'AI Assistant',
        avatar: '🤖',
        type: 'ai',
        isOnline: true,
    },
    {
        id: '4',
        name: 'ChatGPT',
        avatar: '🧠',
        type: 'ai',
        isOnline: true,
    }
];