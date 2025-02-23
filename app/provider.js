"use client";
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm'; // ✅ Import eq from drizzle-orm
import React, { useEffect, useState } from 'react';

function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoaded && user && !checked) {
      isNewUser();
      setChecked(true); // Prevent infinite loop
    }
  }, [isLoaded, user, checked]);

  const isNewUser = async () => {
    try {
      const result = await db.select().from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress)); // ✅ eq now works

      console.log("User query result:", result);

      if (!result[0]) {
        await db.insert(Users).values({
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl,
        });
      }
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
