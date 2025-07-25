"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "@/lib/api";
import { User } from "@/types";
import { UserTable } from "@/components/UserTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortAsc, setSortAsc] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadUsers = async () => {
        setLoading(true);
        const { data } = await fetchUsers();
        setUsers(data || []);
        setLoading(false);
    };
    loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(
        (user) =>
        user.username.toLowerCase().includes(query) ||
        (user.about?.toLowerCase().includes(query) ?? false)
    );
    }, [users, searchQuery]);

    const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return sortAsc ? dateA - dateB : dateB - dateA;
    });
    }, [filteredUsers, sortAsc]);

    const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
    <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
            placeholder="Search users or about..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
            }}
            className="pl-10 text-base"
            disabled={loading}
            />
        </div>
        <Button variant="outline" onClick={() => setSortAsc((prev) => !prev)} disabled={loading}>
            Sort by Date {sortAsc ? "↑" : "↓"}
        </Button>
        </div>

        {loading ? (
        <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
        </div>
        ) : (
        <>
            <UserTable users={currentUsers} />

    {/* Pagination */}
    {totalPages > 1 && (
    <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
    <Button
        size="sm"
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
    >
        Prev
    </Button>

    {Array.from({ length: totalPages }, (_, i) => (
        <Button
        key={i}
        size="sm"
        variant={currentPage === i + 1 ? "default" : "outline"}
        onClick={() => setCurrentPage(i + 1)}
        >
        {i + 1}
        </Button>
    ))}

    <Button
        size="sm"
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
    >
        Next
    </Button>
    </div>
    )}
        </>
        )}
    </div>
    );
}
