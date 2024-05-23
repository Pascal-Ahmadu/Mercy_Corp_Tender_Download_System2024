export const supabase = {
    from: jest.fn(() => ({
      select: jest.fn(),
    })),
  };