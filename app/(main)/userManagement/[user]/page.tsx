'use client';
import { Button, PrimaryLink } from '@/components/shared/NavLink';
import UserTable from '@/components/usermanagement/UserTable';
import FundUserModal from '@/components/usermanagement/FundUserModal';
import { axiosGet, axiosPost } from '@/utils/api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {
  const { user } = useParams();
  const [userInfo, setUserInfo] = useState<userDetailProps | any>(null);
  const [loading, setLoading] = useState(true);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  
  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      try {
        const res = await axiosGet(`/admin/users?search=${user}`, true);
        console.log('User info API response:', res);

        // Handle different response structures
        let userData = null;
        if (res.users && Array.isArray(res.users.data)) {
          userData = res.users.data[0];
        } else if (res.users && Array.isArray(res.users)) {
          userData = res.users[0];
        } else if (res.user) {
          userData = res.user;
        } else if (Array.isArray(res.data)) {
          userData = res.data[0];
        }

        setUserInfo(userData);
      } catch (error) {
        console.log('Error fetching user info:', error);
        toast.error('Unable to fetch user information');
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [user]);

  const handleSuspendUser = async (user_id: string | number | undefined) => {
    try {
      const confirm = window.confirm(
        'Are you sure you want to suspend this user'
      );

      if (confirm) {
        await axiosPost('/admin/user/ban', { user_id }, true);
        toast.success('User Deleted Successfully');
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while deleting admin');
    }
  };
  const explanationHeaderStyles = 'text-black text-[1.2vw] font-semibold';
  const explanationBodyStyles = 'text-gray-400 text-[1vw] font-medium';

  if (loading) {
    return (
      <div className="my-5 mx-11">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="my-5 mx-11">
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 mx-11">
      <header className="font-man-rope text-[1.2vw] text-[rgba(51,51,51,0.60)] flex gap-4 mb-6">
        <p>User List</p>
        <p className="text-[#858585] font-medium">&gt;</p>
        <p className="font-medium text-[rgba(51,51,51,0.80)]">
          {userInfo.name || 'N/A'}
        </p>
      </header>
      <main className="space-y-6 w-[80%]">
        <ExplanationItems>
          <header className={`${explanationHeaderStyles} mb-5`}>
            Personal Information
          </header>
          <section className={`flex items-center justify-between`}>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Name</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.name || 'N/A'}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Email Address</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.email || 'N/A'}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Phone Number</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.phone_number || 'N/A'}
              </p>
            </div>
          </section>
        </ExplanationItems>
        <ExplanationItems>
          <header className={`${explanationHeaderStyles} mb-5`}>
            Account Information
          </header>
          <section className={`flex items-center justify-between`}>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Account Status</h2>
              <p
                className={`${explanationBodyStyles} ${
                  userInfo.status == 'Inacitve'
                    ? 'text-red-400'
                    : 'text-green-400'
                } `}
              >
                {userInfo.status == 'Inacitve' ? 'Inactive' : 'Active'}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Date Joined</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.date_joined || 'N/A'}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Account Tier</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo['tier'] || 'N/A'}
              </p>
            </div>
          </section>
        </ExplanationItems>
        <ExplanationItems>
          <header className={`${explanationHeaderStyles} mb-5`}>
            KYC Status
          </header>
          <section className={`flex items-center justify-between`}>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Approval Status</h2>
              <p className={`${explanationBodyStyles} text-[#F3A218]`}>
                {userInfo.appStatus || 'N/A'}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>
                Document Uploaded
              </h2>
              <Link
                href={userInfo.document_path ? userInfo.document_path : ''}
                className={`${explanationBodyStyles}`}
                target={userInfo.document_path && '_blank'}
              >
                {userInfo.document_path ? 'Click here to view' : 'N/A'}
              </Link>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>KYC Status</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.kyc_status || 'N/A'}
              </p>
            </div>
          </section>
        </ExplanationItems>
        <ExplanationItems>
          <header className={`${explanationHeaderStyles} mb-5`}>
            Wallet Information
          </header>
          <section className={`flex items-center justify-between`}>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Current Balance</h2>
              <p className={`${explanationBodyStyles} text-[#F3A218]`}>
                {userInfo.current_balance}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>
                Total Withdrawals
              </h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.total_withdrawals}
              </p>
            </div>
            <div>
              <h2 className={`${explanationHeaderStyles}`}>Total Deposit</h2>
              <p className={`${explanationBodyStyles}`}>
                {userInfo.total_deposits}
              </p>
            </div>
          </section>
        </ExplanationItems>
        <h2 className="text-xl font-semibold mt-2">Refferals</h2>
        <table className="w-full border-collapse border border-gray-100 rounded-lg">
          <thead>
            <tr className="bg-white-200 text-left rounded-lg">
              <th className="p-3">Id</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date Joined</th>
              <th className="p-3">KYC Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {[...Array(5)].map(
                  (
                    _,
                    index // Generate 5 skeleton rows
                  ) => (
                    <tr key={index} className="animate-pulse border-gray-100">
                      <td colSpan={5} className="p-3">
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : userInfo?.referrals_list &&
              Array.isArray(userInfo.referrals_list) &&
              userInfo.referrals_list.length > 0 ? (
              userInfo.referrals_list.map(
                (user: {
                  id: string;
                  user_identifier: string;
                  email: string | null;
                  phone_number: string | null;
                  date_joined: string;
                  is_verified: boolean;
                }) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 text-[0.85vw] font-semibold font-man-rope text-gray-400"
                  >
                    <td className="p-3 capitalize">
                      {user?.user_identifier || 'N/A'}
                    </td>
                    <td className="p-3">{user?.email || 'N/A'}</td>
                    <td className="p-3">{user?.phone_number || 'N/A'}</td>
                    <td className="p-3">{user?.date_joined || 'N/A'}</td>
                    <td className="p-3 text-blue-500">
                      {user.is_verified ? 'Verified' : 'Not Verified'}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No referrals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-4 py-6">
          <Button
            onClick={() => setIsFundModalOpen(true)}
            text="Fund User"
            className="max-w-[180px] bg-green-600 hover:bg-green-700"
          />
          <Button
            onClick={() => handleSuspendUser(userInfo.id)}
            text="Suspend User"
            className="max-w-[180px] bg-red-600 hover:bg-red-700"
          />
        </div>
      </main>

      {/* Fund User Modal */}
      <FundUserModal
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
        userId={userInfo?.id}
        userName={userInfo?.name || userInfo?.email || 'User'}
      />
    </div>
  );
};

export default page;

const ExplanationItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-5 rounded-[20px] bg-white font-man-rope pr-14">
      {children}
    </div>
  );
};
