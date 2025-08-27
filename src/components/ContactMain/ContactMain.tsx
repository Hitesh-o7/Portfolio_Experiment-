'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './style.module.css';
import Rounded from '../ui/RoundedButton/Roundend';
import Magnetic from '../ui/Magnetic/Magnetic';
import Image from 'next/image';

interface FormValues {
    name: string;
    email: string;
    org: string;
    services: string;
    message: string;
}

export default function ContactMain() {
    const [inputValues, setInputValues] = useState<FormValues>({
        name: '',
        email: '',
        org: '',
        services: '',
        message: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const googleFormUrl =
            'https://docs.google.com/forms/d/e/1FAIpQLSe9JWouNwV68pdzPZhfjmq_PlAbrMY7W6AHrQicaNvuOXQIGQ/formResponse';

        const formData = new URLSearchParams();
        formData.append('entry.1211313076', inputValues.name);
        formData.append('entry.1053213077', inputValues.email);
        formData.append('entry.758328858', inputValues.org);
        formData.append('entry.1034723582', inputValues.services);
        formData.append('entry.1955999451', inputValues.message);

        fetch(googleFormUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
        })
            .then(() => {
                alert('Form Submitted Successfully');
                setInputValues({
                    name: '',
                    email: '',
                    org: '',
                    services: '',
                    message: '',
                });
            })
            .catch(() => {
                alert('Form Submission Failed');
            });
    };

    const isFilled = (value: string) => value.trim() !== '';

    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.title}>
                    <h1 className={styles.hh}>Let&apos;s start a project together</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {[
                        { id: '01', label: "What's your name?", name: 'name', placeholder: 'Hitesh Thakur ..' },
                        { id: '02', label: "What's your email?", name: 'email', placeholder: '#$#$#@gmail.com' },
                        { id: '03', label: "What's the name of your organization?", name: 'org', placeholder: 'Apple.inc' },
                        { id: '04', label: 'What services are you looking for?', name: 'services', placeholder: 'Web Design, Web Dev' },
                        { id: '05', label: 'Your message', name: 'message', placeholder: 'Hello Hitesh, can you help me with...*' },
                    ].map(({ id, label, name, placeholder }) => (
                        <div key={name} className={styles.formItem}>
                            <div className={styles.labelContainer}>  
                                <h1>{id}</h1>
                                <label htmlFor={name} className={isFilled(inputValues[name as keyof FormValues]) ? styles.filled : ''}>
                                    {label}
                                </label>
                            </div>
                            <input
                                type="text"
                                name={name}
                                placeholder={placeholder}
                                value={inputValues[name as keyof FormValues]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className='w-full flex justify-center items-center mb-16'>
                        <Magnetic>
                            <Rounded onClick={handleSubmit}>
                                <p>Send it!</p>
                            </Rounded>
                        </Magnetic>
                    </div>
                </form>
            </div>
            <div className={styles.right}>
                <div className={styles.profileContainer}>
                    <Image src="/MainPic.jpg" alt="Profile" className={styles.profileImage} width={300} height={300} />
                    <div className={styles.arrow}>&#8600;</div>
                </div>
                <div className={styles.contactDetails}>
                    <Magnetic>
                        <h2>Contact  Details</h2>
                    </Magnetic>
                    <p>hitesh.design7@gmail.com</p>
                    <p>+91 78761 80311</p>
                </div>
                <div className={styles.socialLinks}>
                    <Magnetic>
                        <h2>Follow Me</h2>
                    </Magnetic>
                    <a href="https://github.com/Hitesh-o7" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://www.instagram.com/_hitesh.thakur/" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="https://x.com/HiteshThakur77" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href="https://www.linkedin.com/in/hitesh-thakur07/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.round}>
                    <Rounded>
                        <p>@hitesh.design7@gmail.com</p>
                    </Rounded>
                    <Rounded>
                        <p>+91 7876180311</p>
                    </Rounded>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.title}>
                    <h1>Social</h1>
                    <div className={styles.links}>
                        <a href="https://github.com/HiteshO7" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href="https://www.instagram.com/_hitesh.thakur/" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                        <a href="https://x.com/HiteshThakur77" target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                        <a href="https://www.linkedin.com/in/hitesh-thakur07/" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
