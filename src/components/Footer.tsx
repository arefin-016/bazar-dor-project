const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white mt-9">
      <div className="container mx-auto flex flex-col items-start justify-between gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
        {/* Left Side */}
        <p className="text-sm text-gray-600">
          <span className="font-bold text-green-700">বাজার দর</span>
          {" — "}প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Side */}
        <p className="text-xs leading-5 text-gray-500 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;